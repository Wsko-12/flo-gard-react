import { GameStore } from '../../../../../../gameStore/GameStore';
import LoopsManager from '../../../../../../loopsManager/LoopsManager';
import { WorldObject } from '../WorldObject';

export class MoveDecorator {
  public isMoving = false;

  worldObject: WorldObject;
  constructor(gameObject: WorldObject) {
    this.worldObject = gameObject;
  }

  setIsMoving(flag: boolean) {
    this.isMoving = flag;
  }

  move = () => {
    if (!this.isMoving) {
      return;
    }

    const { x, z } = GameStore.cameraTarget;
    this.worldObject.checkCollision();
    this.worldObject.setMeshPosition(x, z);
  };

  add() {
    LoopsManager.subscribe('update', this.move);
  }
  remove() {
    LoopsManager.unsubscribe('update', this.move);
  }
}
