import {
  EGameEntityTypes,
  GameEntity,
  IEntityAddsState,
  IEntityState,
} from "../../base/GameEntity/GameEntity";
import { TFiveRange } from "../../../../ts/interfaces";

interface IPotGroundAddState extends IEntityAddsState {
  water: TFiveRange;
  light: TFiveRange;
  temperature: TFiveRange;
}

interface IPotGroundState extends IEntityState {
  adds: IPotGroundAddState;
}

export const getPotGroundColorByWet = (waterPoints: TFiveRange) => {
  const color = Math.floor(255 * ((8 - waterPoints) / 8)).toString(16);

  return `#${color.repeat(3)}`;
};

class PotGround extends GameEntity {
  type = EGameEntityTypes.potGround;
  inventoryData = {
    title: "Pot Ground",
  };

  public state: IPotGroundAddState = {
    water: 0,
    light: 0,
    temperature: 0,
  };

  constructor() {
    super();
    this.init();
  }

  public pour() {
    this.state.water += this.state.water < 5 ? 1 : 0;
    this.storeManager.updateState();
  }
}

export type { IPotGroundState, IPotGroundAddState };

export { PotGround };
