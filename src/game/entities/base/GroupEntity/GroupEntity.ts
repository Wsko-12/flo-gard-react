import { IndependentGameEntity } from '../IndependentGameEntity/IndependentGameEntity';

export abstract class GroupEntity extends IndependentGameEntity {
  protected entities: IndependentGameEntity[] = [];
  protected abstract yShift: number;
  isGroupEntity = true;

  addEntity(entity: IndependentGameEntity) {
    if (this.entities.includes(entity)) {
      return;
    }
    this.entities.push(entity);
  }

  removeEntity(entity: IndependentGameEntity) {
    const index = this.entities.indexOf(entity);
    if (index === -1) {
      return;
    }
    this.entities.splice(index, 1);
  }

  canAcceptEntity(entity: IndependentGameEntity): boolean {
    return !(entity instanceof GroupEntity);
  }

  getYShift() {
    if (!this.inGroupEntity) {
      return this.yShift;
    }
    return 0;
  }
}
