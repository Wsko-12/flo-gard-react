import { GameEntity } from './GameEntity';

export class EntityManager {
  static entities: GameEntity[] = [];
  static addEntity(entity: GameEntity) {
    this.entities.push(entity);
  }
}
