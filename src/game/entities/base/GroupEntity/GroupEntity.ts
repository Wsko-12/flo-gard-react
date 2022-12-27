import { EntityId } from '@reduxjs/toolkit';
import { IEntityAddsState } from '../GameEntity/GameEntity';
import { IndependentGameEntity } from '../IndependentGameEntity/IndependentGameEntity';

export interface IGroupEntityAddsState extends IEntityAddsState {
  entities: EntityId[];
}

export abstract class GroupEntity extends IndependentGameEntity {
  protected entities: IndependentGameEntity[] = [];
  protected abstract yShift: number;
  isGroupEntity = true;

  public addEntity(entity: IndependentGameEntity) {
    if (this.entities.includes(entity)) {
      return;
    }
    this.entities.push(entity);
    this.storeManager.updateState();
  }

  public removeEntity(entity: IndependentGameEntity) {
    const index = this.entities.indexOf(entity);
    if (index === -1) {
      return;
    }
    this.entities.splice(index, 1);
    this.storeManager.updateState();
  }

  public canAcceptEntity(entity: IndependentGameEntity): boolean {
    if (entity instanceof GroupEntity) {
      return false;
    }

    return this.collider.isColliderInside(entity.getCollider());
  }

  public getYShift() {
    if (!this.inGroupEntity) {
      return this.yShift;
    }
    return 0;
  }
  public getAddsState(): IGroupEntityAddsState | null {
    return {
      entities: this.entities.map((entity) => entity.id),
    };
  }
}
