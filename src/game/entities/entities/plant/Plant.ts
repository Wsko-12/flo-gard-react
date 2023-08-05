import {
  EGameEntityTypes,
  GameEntity,
  IEntityAddsState,
  IEntityState,
} from "../../base/GameEntity/GameEntity";
import { EPotSizes } from "../pots/Pot";
import { BufferGeometry, DoubleSide, Group, Mesh } from "three";
import { LoopsManager } from "../../../loopsManager/LoopsManager";
import { Assets } from "../../../../assets/Assets";
import { PhongMaterialWithCloseCameraShader } from "../../../Materials/PhongWithCloseCamera";

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

const FLOWERING_VARIATIONS = 3;

const buildGeometriesMap = (assetName: string, variation: number) => {
  return STAGES_ARR.reduce<Record<string, BufferGeometry>>((acc, stage) => {
    if (stage === EPlantGrowthStages.FLOWERING) {
      for (let i = 1; i <= FLOWERING_VARIATIONS; i++) {
        acc[`${stage}_${i}`] = Assets.getGeometry(`${assetName}_${variation}_${stage}_${i}`);
      }
    } else {
      acc[stage] = Assets.getGeometry(`${assetName}_${variation}_${stage}`);
    }

    return acc;
  }, {});
};

abstract class Plant extends GameEntity {
  type = EGameEntityTypes.plant;
  protected mesh: Mesh | Group;
  growthStage: EPlantGrowthStages | null = null;

  // how much ticks takes one growthStage
  abstract readonly growTime: number;
  private currentTick = 0;
  abstract size: EPotSizes;
  private readonly variation: number;

  protected geometries: Record<string, BufferGeometry>;

  constructor(assetName: string, variations?: number) {
    super();
    LoopsManager.subscribe("plantsTick", this.growLoop);

    this.variation = variations ? Math.ceil(Math.random() * variations) : 1;

    this.geometries = buildGeometriesMap(assetName, this.variation);

    this.mesh = new Mesh(
      this.geometries[EPlantGrowthStages.SEEDING],
      PhongMaterialWithCloseCameraShader({ map: Assets.getTexture(assetName), side: DoubleSide })
    );

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  public getMesh(): Mesh | Group {
    return this.mesh;
  }

  private growLoop = () => {
    if (this.growthStage === null || this.growthStage === EPlantGrowthStages.REST) {
      return;
    }

    if (this.isGoodCare()) {
      this.currentTick++;
    }

    if (this.currentTick === this.growTime) {
      this.setNewGrowthStage();
      this.currentTick = 0;
    }

    this.changeMesh();
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

  private isGoodCare = () => true;

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

    let newGeometry: BufferGeometry;

    if (this.growthStage != EPlantGrowthStages.FLOWERING) {
      newGeometry = this.geometries[this.growthStage];
    } else {
      const index = Math.floor((this.currentTick / this.growTime) * 3) + 1; // 1 - 3

      newGeometry = this.geometries[this.growthStage + `_${index}`];

      if (!newGeometry) {
        console.error(
          `[Plant changeMesh] geometry ${this.growthStage + "_" + index} is undefined`,
          this.geometries
        );

        return;
      }
    }

    if (!newGeometry) {
      console.error(
        `[Plant changeMesh] geometry ${this.growthStage} is undefined`,
        this.geometries
      );

      return;
    }

    if (this.mesh.geometry != newGeometry) {
      this.mesh.geometry = newGeometry;
    }
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
