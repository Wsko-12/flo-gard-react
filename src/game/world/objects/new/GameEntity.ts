import { EntityId } from '@reduxjs/toolkit';
import {
  selectEntityOnMove,
  setEntityOnMove,
} from '../../../../store/slices/gameEntityOnEdit/gameEntityOnEdit';
import {
  placeInInventoryGameEntity,
  placeInWorldGameEntity,
  selectEntityDataById,
} from '../../../../store/slices/new/gameEntities';
import { store } from '../../../../store/store';
import { EntityManager } from './EntityManager';
import { IGameEntityStoreData } from './interfaces';
import { InventoryObject } from './inventoryObject/InventoryObject';
import { WorldObject } from './worldObject/WorldObject';

export abstract class GameEntity {
  worldObject: WorldObject;
  inventoryObject: InventoryObject;
  id: EntityId;
  inInventory = true;
  storeUnsubscribe = () => {};
  constructor(id: EntityId, worldObject: WorldObject, inventoryObject: InventoryObject) {
    this.id = id;
    worldObject.setEntityId(this.id);
    this.worldObject = worldObject;
    this.inventoryObject = inventoryObject;
    EntityManager.addEntity(this);

    this.subscribeStore();
  }

  private subscribeStore() {
    this.storeUnsubscribe = store.subscribe(this.applyStoreData);
  }

  private applyStoreData = () => {
    const state = store.getState();
    const data = selectEntityDataById(this.id)(state);
    if (!data) {
      return;
    }

    const isOnMove = selectEntityOnMove(state) == this.id;
    this.worldObject.applyStoreData(data.world, isOnMove);
  };

  getStoreData(): IGameEntityStoreData {
    return {
      id: this.id,
      inInventory: this.inInventory,
      inventory: this.inventoryObject.getStoreData(),
      world: this.worldObject.getStoreData(),
    };
  }

  placeInWorld() {
    this.worldObject.placeInWorld();
    store.dispatch(placeInWorldGameEntity(this.id));
  }

  placeInInventory() {
    this.worldObject.placeInInventory();
    store.dispatch(placeInInventoryGameEntity(this.id));
  }

  public applyMove() {
    store.dispatch(setEntityOnMove(null));

    const isCollision = !!this.worldObject.getCollider()?.isCollision();
    if (isCollision) {
      this.cancelMove();
      return false;
    }

    const mesh = this.worldObject.getMesh();
    if (!mesh) {
      return;
    }
    const { x, z } = mesh.position;
    this.worldObject.setPosition(x, z);
  }

  public cancelMove() {
    store.dispatch(setEntityOnMove(null));

    if (this.worldObject.position) {
      const { x, y } = this.worldObject.position;
      this.worldObject.setPosition(x, y);
    } else {
      this.placeInInventory();
    }
  }
}
