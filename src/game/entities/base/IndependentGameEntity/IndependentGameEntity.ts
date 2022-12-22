import { Group, Mesh } from 'three';
import { IPosition2 } from '../../../../ts/interfaces';
import { Point2 } from '../../../world/environment/utils/Geometry';
import World from '../../../world/World';
import { GameEntity, IEntityState } from '../GameEntity/GameEntity';
import { IndependentGameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IIndependentEntityState extends IEntityState {
  position: IPosition2 | null;
}
export abstract class IndependentGameEntity extends GameEntity {
  abstract mesh: Mesh | Group;
  public readonly isIndependent = true;
  public position: Point2 | null = null;
  public storeManager: IndependentGameEntityStoreManager;
  constructor() {
    super();
    this.storeManager = new IndependentGameEntityStoreManager(this);
  }

  public placeInWorld() {
    World.getScene().add(this.mesh);
    super.placeInWorld();
  }
}
