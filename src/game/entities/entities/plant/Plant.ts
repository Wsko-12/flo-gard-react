import {
  EGameEntityTypes,
  GameEntity,
  IEntityAddsState,
  IEntityState,
} from "../../base/GameEntity/GameEntity";
import { EPotSizes } from "../pots/Pot";
import { Group, Mesh } from "three";

enum EPlantGrowthStages {
  SEEDING = "SEEDING",
  ENGRAFTMENT = "ENGRAFTMENT",
  GROWTH = "GROWTH",
  FLOWERING = "FLOWERING",
  REST = "REST",
}

interface IPlantAddState extends IEntityAddsState {
  growthStage: EPlantGrowthStages;
}

interface IPlantState extends IEntityState {
  adds: IPlantAddState;
}

abstract class Plant extends GameEntity {
  type = EGameEntityTypes.plant;
  abstract mesh: Mesh | Group;
  growthStage: EPlantGrowthStages | null = null;

  abstract size: EPotSizes;

  public getMesh(): Mesh | Group {
    return this.mesh;
  }
}

export type { IPlantState };

export { Plant };
