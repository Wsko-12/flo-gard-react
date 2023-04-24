import { EPlantGrowthStages, Plant } from "../Plant";
import { Assets } from "../../../../../assets/Assets";
import { PhongMaterialWithCloseCameraShader } from "../../../../Materials/PhongWithCloseCamera";
import { DoubleSide, Mesh } from "three";
import { EPotSizes } from "../../pots/Pot";
import { IEntityInventoryData } from "../../../base/GameEntity/GameEntity";

const assetName = "opuntia";

class Opuntia extends Plant {
  geometries = {
    [EPlantGrowthStages.SEEDING]: Assets.getGeometry(assetName + "_seeding"),
    [EPlantGrowthStages.ENGRAFTMENT]: Assets.getGeometry(assetName + "_engraftment"),
    [EPlantGrowthStages.GROWTH]: Assets.getGeometry(assetName + "_growth"),
    [EPlantGrowthStages.FLOWERING]: Assets.getGeometry(assetName + "_flowering"),
    [EPlantGrowthStages.REST]: Assets.getGeometry(assetName + "_flowering"),
  };

  mesh = new Mesh(
    Assets.getGeometry(assetName + "_seeding"),
    PhongMaterialWithCloseCameraShader({ map: Assets.getTexture(assetName), side: DoubleSide })
  );
  growTime = 50;

  size = EPotSizes.M;

  inventoryData: IEntityInventoryData = {
    title: "Opuntia",
  };

  constructor() {
    super();
    this.init();

    const { mesh } = this;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
}

export { Opuntia };
