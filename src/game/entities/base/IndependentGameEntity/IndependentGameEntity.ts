import { BufferGeometry, Group, Mesh } from 'three';
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
import { Point2 } from '../../../world/environment/utils/Geometry';
import World from '../../../world/World';
import { GameEntity, IEntityState } from '../GameEntity/GameEntity';
import { ClickBox } from './ClickBox/ClickBox';
import { IndependentGameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IIndependentEntityState extends IEntityState {
  position: IPosition2 | null;
}

export abstract class IndependentGameEntity extends GameEntity {
  abstract mesh: Mesh | Group;
  abstract clickGeometry: BufferGeometry;
  public readonly isIndependent = true;
  public position: Point2 | null = null;
  private meshPosition: Point2 = new Point2(0, 0);
  public isOnMove = false;

  // public storeManager: IndependentGameEntityStoreManager;
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
    this.position = null;
    this.openCard();
    World.getScene().add(this.mesh);
    this.clickBox?.add();
    LoopsManager.subscribe('update', this.move);
    this.setIsOnMove(true);

    super.placeInWorld();
  }

  public placeInInventory() {
    this.closeCard(false);
    World.getScene().remove(this.mesh);
    this.clickBox?.remove();
    LoopsManager.unsubscribe('update', this.move);
    this.setIsOnMove(false, false);
    super.placeInInventory();
  }

  public openCard() {
    store.dispatch(openEntityCard(this.id));
  }

  public closeCard(callPlaceInInventory = true) {
    if (this.position === null && callPlaceInInventory) {
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

  private setMeshPosition(x: number, y: number) {
    this.meshPosition.set(x, y);
    this.mesh.position.set(x, 0, y);
    this.clickBox?.setPosition(x, y);
  }

  public setIsOnMove(flag: boolean, callPlaceInInventory = true) {
    if (this.isOnMove != flag) {
      this.isOnMove = flag;
      if (!flag && this.position === null && callPlaceInInventory) {
        this.placeInInventory();
        return;
      }

      if (flag) {
        store.dispatch(setEntityOnMove(this.id));
      } else {
        if (this.position) {
          const { x, y } = this.position;
          this.setMeshPosition(x, y);
        }

        store.dispatch(deleteEntityOnMove(this.id));
      }
    }
  }

  public applyPosition() {
    const { x, y } = this.meshPosition;
    if (!this.position) {
      this.position = new Point2(x, y);
    } else {
      this.position.set(x, y);
    }
    this.storeManager.updateState();
    this.setIsOnMove(false);
  }

  private move = () => {
    if (!this.isOnMove) {
      return;
    }
    const { x, z } = GameStore.cameraTarget;
    this.setMeshPosition(x, z);
  };
}
