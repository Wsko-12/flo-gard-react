import { IPosition2 } from '../../../../ts/interfaces';
import { Point2 } from '../../../world/environment/utils/Geometry';
import { GameEntity, IEntityState } from '../GameEntity/GameEntity';
import { IndependentGameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IIndependentEntityState extends IEntityState {
  position: IPosition2 | null;
}
export abstract class IndependentGameEntity extends GameEntity {
  public readonly isIndependent = true;
  public position: Point2 | null = null;
  public storeManager: IndependentGameEntityStoreManager;
  constructor() {
    super();
    this.storeManager = new IndependentGameEntityStoreManager(this);
  }
}
