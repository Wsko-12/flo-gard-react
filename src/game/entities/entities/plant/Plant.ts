import {
  EGameEntityTypes,
  GameEntity,
  IEntityAddsState,
  IEntityState,
} from "../../base/GameEntity/GameEntity";
import { EPotSizes } from "../pots/Pot";
import { BufferGeometry, Group, Mesh } from "three";
import { LoopsManager } from "../../../loopsManager/LoopsManager";

enum EPlantGrowthStages {
  SEEDING = "SEEDING",
  ENGRAFTMENT = "ENGRAFTMENT",
  GROWTH = "GROWTH",
  FLOWERING = "FLOWERING",
  REST = "REST",
}

const STAGES_ARR = [
  EPlantGrowthStages.SEEDING,
  EPlantGrowthStages.ENGRAFTMENT,
  EPlantGrowthStages.GROWTH,
  EPlantGrowthStages.FLOWERING,
  EPlantGrowthStages.REST,
];

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

  // how much ticks takes one growthStage
  abstract readonly growTime: number;
  private currentTick = 0;
  abstract size: EPotSizes;

  protected abstract geometries: Record<EPlantGrowthStages, BufferGeometry>;

  constructor() {
    super();
    LoopsManager.subscribe("plantsTick", this.growLoop);
  }

  public getMesh(): Mesh | Group {
    return this.mesh;
  }

  private growLoop = () => {
    if (this.growthStage === null) {
      return;
    }

    if (this.isGoodCare()) {
      this.currentTick++;
    }

    if (this.currentTick === this.growTime) {
      if (this.growthStage != EPlantGrowthStages.REST) {
        this.setNewGrowthStage();
        this.changeMesh();
        this.currentTick = 0;
      }
    }

    this.updateMeshScale();
  };

  private updateMeshScale() {
    if (
      this.growthStage === EPlantGrowthStages.FLOWERING ||
      this.growthStage === EPlantGrowthStages.REST
    ) {
      this.mesh.scale.set(1, 1, 1);

      return;
    }
    const scale =
      this.growthStage === EPlantGrowthStages.SEEDING
        ? this.currentTick / this.growTime // 0 - 1
        : this.currentTick / this.growTime / 2 + 0.5; // 0.5 - 1;
    this.mesh.scale.set(scale, scale, scale);
  }

  private isGoodCare = () => false;

  protected setNewGrowthStage() {
    if (this.growthStage === null) {
      return;
    }

    const index = STAGES_ARR.indexOf(this.growthStage);
    this.growthStage = STAGES_ARR[index + 1];
  }

  protected changeMesh() {
    if (this.growthStage === null) {
      console.error("[Plant changeMesh] growthStage is null");

      return;
    }

    if (this.mesh instanceof Group) {
      this.changeMeshInGroup();

      return;
    }

    this.mesh.geometry = this.geometries[this.growthStage];
  }

  protected changeMeshInGroup() {
    console.error("[Plant changeMeshInGroup] Implement!");

    return;
  }

  public plant() {
    this.growthStage = EPlantGrowthStages.SEEDING;
    this.updateMeshScale();
  }
}

export type { IPlantState };

export { Plant, EPlantGrowthStages };
