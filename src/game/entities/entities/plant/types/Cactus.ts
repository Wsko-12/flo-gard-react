import { Plant } from "../Plant";
import { Assets } from "../../../../../assets/Assets";
import { PhongMaterialWithCloseCameraShader } from "../../../../Materials/PhongWithCloseCamera";
import { Mesh } from "three";
import { EPotSizes } from "../../pots/Pot";
import { IEntityInventoryData } from "../../../base/GameEntity/GameEntity";

const assetName = "cactus";

class Cactus extends Plant {
  mesh = new Mesh(
    Assets.getGeometry(assetName),
    PhongMaterialWithCloseCameraShader({ map: Assets.getTexture(assetName) })
  );

  size = EPotSizes.M;

  inventoryData: IEntityInventoryData = {
    title: "Cactus",
  };

  constructor() {
    super();
    this.init();

    const { mesh } = this;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
}

export { Cactus };
