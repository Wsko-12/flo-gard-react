import { BufferGeometry, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, Object3D } from 'three';
import {
  closeEntityCard,
  deleteEntityOnMove,
  openEntityCard,
  setEntityOnMove,
  toggleEntityCardOpened,
} from '../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { store } from '../../../../store/store';
import { IPosition2 } from '../../../../ts/interfaces';
import { GameStore } from '../../../gameStore/GameStore';
import LoopsManager from '../../../loopsManager/LoopsManager';
import Environment from '../../../world/environment/Environment';
import { Point2 } from '../../../world/environment/utils/Geometry';
import { EColorsPallet } from '../../../world/environment/utils/utils';
import World from '../../../world/World';
import { GameEntity, IEntityState } from '../GameEntity/GameEntity';
import { GroupEntity } from '../GroupEntity/GroupEntity';
import { ClickBox } from './ClickBox/ClickBox';
import { Collider } from './Collider/Collider';
import { IndependentGameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IIndependentEntityState extends IEntityState {
  position: IPosition2 | null;
  isRotate: boolean;
  angle: number;
}

export abstract class IndependentGameEntity extends GameEntity {
  static setMeshBlockColor(entity: IndependentGameEntity, flag: boolean) {
    const set = function setTransparent(mesh: Object3D | Mesh | Group | null) {
      if (!mesh) {
        return;
      }
      if (!(mesh instanceof Mesh || mesh instanceof Group)) {
        return;
      }

      if (mesh instanceof Mesh) {
        if (
          mesh.material instanceof MeshBasicMaterial ||
          mesh.material instanceof MeshPhongMaterial
        ) {
          const color = mesh.userData.staticColor || entity.selectedColor;
          mesh.material.color.set(flag ? 0xff0000 : color);
        }
      } else {
        mesh.children.forEach(setTransparent);
      }
    };
    const mesh = entity.getMesh();
    set(mesh);
  }
  abstract mesh: Mesh | Group;
  abstract collider: Collider;
  abstract clickGeometry: BufferGeometry;
  public readonly isIndependent = true;
  public placed: {
    position: Point2 | null;
    angle: number;
  } = {
    position: null,
    angle: 0,
  };
  // public position: Point2 | null = null;
  private meshPosition: Point2 = new Point2(0, 0);
  private meshRotation = 0;
  public isOnMove = false;
  public abstract isRotate: boolean;

  protected clickBox: ClickBox | null = null;

  protected inGroupEntity: GroupEntity | null = null;
  public isGroupEntity = false;

  selectedColor = EColorsPallet.white;
  constructor() {
    super();
    this.storeManager.unsubscribe();
    this.storeManager = new IndependentGameEntityStoreManager(this);
  }

  public init() {
    super.init();
    this.clickBox = new ClickBox(this.clickGeometry, this);
  }

  public placeInWorld() {
    this.placed.position = null;
    this.placed.angle = 0;
    this.meshRotation = 0;
    this.collider.add();
    World.getScene().add(this.mesh);
    this.clickBox?.add();
    LoopsManager.subscribe('update', this.moveCb);
    this.setIsOnMove(true);
    super.placeInWorld();
    this.openCard();
  }

  public placeInInventory() {
    this.changeInGroupEntity(null);
    this.closeCard(false);
    World.getScene().remove(this.mesh);
    this.collider.remove();
    this.clickBox?.remove();
    LoopsManager.unsubscribe('update', this.moveCb);
    this.setIsOnMove(false, false);
    super.placeInInventory();
  }

  public openCard() {
    store.dispatch(openEntityCard(this.id));
  }

  public closeCard(callPlaceInInventory = true) {
    if (this.placed.position === null && callPlaceInInventory) {
      this.placeInInventory();
    }
    store.dispatch(closeEntityCard(this.id));
  }

  public onClick = () => {
    if (this.isOnMove) {
      return;
    }
    store.dispatch(toggleEntityCardOpened(this.id));
  };

  private setMeshPosition(x: number, y: number, angle: number) {
    const z = this.inGroupEntity?.getYShift() || 0;
    this.meshPosition.set(x, y);
    this.meshRotation = angle;

    this.mesh.position.set(x, z, y);
    this.mesh.rotation.set(0, angle, 0);
    this.clickBox?.setPosition(x, y, z, angle);
    this.collider.setPosition(x, y, angle);

    const isCollision = this.checkCollision();
    IndependentGameEntity.setMeshBlockColor(this, isCollision);
  }

  // can't create this method static in GroupEntity
  // because of cycle imports
  private selectGroupEntity(groupEntities: GroupEntity[]) {
    if (groupEntities.length === 1) {
      const group = groupEntities[0];
      this.changeInGroupEntity(group);
      return;
    }
    // when this object stand on another object
    // for example stand inside greenHouse
    // we have to find latest groupEntity in this chain
    const parents: GroupEntity[] = [];
    groupEntities.forEach((group) => {
      const parent = group.inGroupEntity;
      if (parent) {
        parents.push(parent);
      }
    });

    for (let i = 0; i < groupEntities.length; i++) {
      const entity = groupEntities[i];
      if (!parents.includes(entity)) {
        this.changeInGroupEntity(entity);
        return;
      }
    }
  }

  private changeInGroupEntity(groupEntity: GroupEntity | null) {
    if (this.inGroupEntity) {
      if (this.inGroupEntity !== groupEntity) {
        this.inGroupEntity.removeEntity(this);
      }
    }

    this.inGroupEntity = groupEntity;
    groupEntity?.addEntity(this);
  }
  private checkCollision() {
    if (!World.collider.isColliderInside(this.collider)) {
      return true;
    }

    const entities = this.collider.isCollision();
    if (!entities) {
      this.changeInGroupEntity(null);
      return false;
    }

    if (!entities.every((entity) => entity.isGroupEntity)) {
      return true;
    }

    const groupEntities = entities as GroupEntity[];

    if (!groupEntities.every((entity) => entity.canAcceptEntity(this))) {
      this.changeInGroupEntity(null);
      return true;
    }

    this.selectGroupEntity(groupEntities);

    return false;
  }

  public setIsOnMove(flag: boolean, callPlaceInInventory = true) {
    if (this.isOnMove != flag) {
      this.isOnMove = flag;
      if (!flag && this.placed.position === null && callPlaceInInventory) {
        this.placeInInventory();
        return;
      }

      if (flag) {
        store.dispatch(setEntityOnMove(this.id));
      } else {
        if (this.placed.position) {
          const { x, y } = this.placed.position;
          const { angle } = this.placed;
          this.setMeshPosition(x, y, angle);
        }

        store.dispatch(deleteEntityOnMove(this.id));
      }
    }
  }

  public applyPosition() {
    if (this.checkCollision()) {
      return;
    }
    const { x, y } = this.meshPosition;
    const angle = this.meshRotation;
    this.placed.angle = angle;
    if (!this.placed.position) {
      this.placed.position = new Point2(x, y);
    } else {
      this.placed.position.set(x, y);
    }
    this.setMeshPosition(x, y, angle);
    Environment.pressGrassByEntities();
    this.storeManager.updateState();
    this.setIsOnMove(false);
  }

  protected move() {
    if (!this.isOnMove) {
      return;
    }
    const { x, z } = GameStore.cameraTarget;
    this.setMeshPosition(x, z, this.meshRotation);
  }

  public rotate(dir: 1 | -1) {
    const angle = (Math.PI / 16) * dir;
    this.meshRotation += angle;
  }

  private moveCb = () => this.move();

  public getCollider() {
    return this.collider;
  }

  public pressGrass(ctx: CanvasRenderingContext2D) {
    this.collider.pressGrass(ctx, this.placed.position, this.placed.angle);
  }
}
