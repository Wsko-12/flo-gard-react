import { EntityId } from "@reduxjs/toolkit";
import { addGameEntity } from "../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { store } from "../../store/store";
import { GameEntity } from "./base/GameEntity/GameEntity";

export class EntityManager {
  private static entities: GameEntity[] = [];

  public static getEntityById(id: EntityId) {
    const entity = this.entities.find((entity) => entity.id === id);

    return entity || null;
  }

  public static addEntity(entity: GameEntity) {
    const alreadyAdded = !!this.getEntityById(entity.id);
    if (!alreadyAdded) {
      this.entities.push(entity);
      store.dispatch(addGameEntity(entity.storeManager.getState()));
    }
  }

  public static removeEntity(entity: GameEntity) {
    const index = this.entities.indexOf(entity);
    if (index === -1) {
      return;
    }
    this.entities.splice(index, 1);
  }
  public static removeEntityById(id: EntityId) {
    const entity = this.getEntityById(id);
    if (entity) {
      this.removeEntity(entity);
    }
  }

  public static getEntities() {
    return this.entities;
  }
}
