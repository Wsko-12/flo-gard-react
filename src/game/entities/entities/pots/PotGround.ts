import {
  EGameEntityTypes,
  GameEntity,
  IEntityAddsState,
  IEntityState,
} from '../../base/GameEntity/GameEntity';

export interface IPotGroundAddState extends IEntityAddsState {
  wet: number;
}

export interface IPotGroundState extends IEntityState {
  adds: IPotGroundAddState;
}

export class PotGround extends GameEntity {
  type = EGameEntityTypes.potGround;
  inventoryData = {
    title: 'Pot Ground',
  };

  state: IPotGroundAddState = {
    wet: 0,
  };

  constructor() {
    super();
    this.init();
  }

  getAddsState() {
    return { ...this.state };
  }
}
