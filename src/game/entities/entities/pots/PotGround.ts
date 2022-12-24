import {
  EGameEntityTypes,
  GameEntity,
  IEntityAddsState,
  IEntityState,
} from '../../base/GameEntity/GameEntity';

type IPotGroundWetState = 0 | 1 | 2 | 3 | 4 | 5;

export interface IPotGroundAddState extends IEntityAddsState {
  wet: IPotGroundWetState;
}

export interface IPotGroundState extends IEntityState {
  adds: IPotGroundAddState;
}
export const getPotGroundColorByWet = (wet: IPotGroundWetState) => {
  const color = Math.floor(255 * ((8 - wet) / 8)).toString(16);
  return `#${color.repeat(3)}`;
};

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

  public pour() {
    this.state.wet += this.state.wet < 5 ? 1 : 0;
    this.storeManager.updateState();
  }

  public getAddsState() {
    return { ...this.state };
  }
}
