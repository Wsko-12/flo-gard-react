import { EntityId } from '@reduxjs/toolkit';
import { addGameEntity } from '../../../store/slices/new/gameEntities';
import { store } from '../../../store/store';

import { GameEntity } from './entities/abstract/GameEntity';

export class EntityManager {
  static entities: GameEntity[] = [];
  static addEntity(entity: GameEntity) {
    this.entities.push(entity);
    store.dispatch(addGameEntity(entity.getStoreData()));
  }

  static getEntityById(id: EntityId) {
    const entity = this.entities.find((entity) => entity.id === id);
    if (!entity) {
      throw new Error(`[EntityManager placeEntityToWorld] Object with ID: ${id} undefined`);
    }
    return entity;
  }

  static getEntities() {
    return this.entities;
  }

  static placeEntityToWorld(id: EntityId) {
    const entity = this.getEntityById(id);

    entity.placeInWorld();
  }

  static placeEntityToInventory(id: EntityId) {
    const entity = this.getEntityById(id);
    entity.placeInInventory();
  }

  static cancelEntityMove(id: EntityId) {
    const entity = this.getEntityById(id);
    entity.cancelMove();
  }

  static applyEntityMove(id: EntityId) {
    const entity = this.getEntityById(id);
    entity.applyMove();
  }
}
