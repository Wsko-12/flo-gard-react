import { Plant } from "../Plant";
import { Assets } from "../../../../../assets/Assets";
import { PhongMaterialWithCloseCameraShader } from "../../../../Materials/PhongWithCloseCamera";
import { DoubleSide, Mesh } from "three";
import { EPotSizes } from "../../pots/Pot";
import { IEntityInventoryData } from "../../../base/GameEntity/GameEntity";

const assetName = "opuntia";

class Opuntia extends Plant {
  mesh = new Mesh(
    Assets.getGeometry(assetName + "_seeding"),
    PhongMaterialWithCloseCameraShader({ map: Assets.getTexture(assetName), side: DoubleSide })
  );

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
