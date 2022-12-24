import { EGameEntityTypes, GameEntity, IEntityAddsState } from '../../base/GameEntity/GameEntity';

export interface IPotGroundState extends IEntityAddsState {
  wet: number;
}

export class PotGround extends GameEntity {
  type = EGameEntityTypes.potGround;
  inventoryData = {
    title: 'Pot Ground',
  };

  state: IPotGroundState = {
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
