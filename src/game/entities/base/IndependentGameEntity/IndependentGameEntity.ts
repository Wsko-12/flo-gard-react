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
import World from '../../../world/World';
import { GameEntity, IEntityState } from '../GameEntity/GameEntity';
import { ClickBox } from './ClickBox/ClickBox';
import { Collider } from './Collider/Collider';
import { IndependentGameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IIndependentEntityState extends IEntityState {
  position: IPosition2 | null;
  isRotate: boolean;
  angle: number;
}

export abstract class IndependentGameEntity extends GameEntity {
  static setMeshTransparent(mesh: Object3D, flag: boolean) {
    const set = function setTransparent(mesh: Object3D) {
      if (!(mesh instanceof Mesh || mesh instanceof Group)) {
        return;
      }

      if (mesh instanceof Mesh) {
        if (
          mesh.material instanceof MeshBasicMaterial ||
          mesh.material instanceof MeshPhongMaterial
        ) {
          mesh.material.transparent = flag;
        }
      } else {
        mesh.children.forEach(setTransparent);
      }
    };
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

  constructor() {
    super();
    this.storeManager.unsubscribe();
    this.storeManager = new IndependentGameEntityStoreManager(this);
  }

  public init() {
    super.init();
    this.clickBox = new ClickBox(this.clickGeometry, this.onClick);
  }

  public placeInWorld() {
    this.placed.position = null;
    this.placed.angle = 0;
    this.meshRotation = 0;
    this.openCard();
    this.collider.add();
    World.getScene().add(this.mesh);
    this.clickBox?.add();
    LoopsManager.subscribe('update', this.moveCb);
    this.setIsOnMove(true);
    super.placeInWorld();
  }

  public placeInInventory() {
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

  private onClick = () => {
    if (this.isOnMove) {
      return;
    }
    store.dispatch(toggleEntityCardOpened(this.id));
  };

  private setMeshPosition(x: number, y: number, angle: number) {
    this.meshPosition.set(x, y);
    this.meshRotation = angle;

    this.mesh.position.set(x, 0, y);
    this.mesh.rotation.set(0, angle, 0);
    this.clickBox?.setPosition(x, y, angle);
    this.collider.setPosition(x, y, angle);

    const isCollision = !!this.collider.isCollision();
    IndependentGameEntity.setMeshTransparent(this.mesh, isCollision);
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
    if (this.collider.isCollision()) {
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
