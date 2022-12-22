import { IPosition2 } from '../../../../ts/interfaces';
import { Point2 } from '../../../world/environment/utils/Geometry';
import { GameEntity, IEntityState } from '../GameEntity/GameEntity';

export interface IIndependentEntityState extends IEntityState {
  position: IPosition2 | null;
}
export abstract class IndependentGameEntity extends GameEntity {
  public readonly isIndependent = true;
  public position: Point2 | null = null;
}
