import { CylinderGeometry, Mesh } from "three";
import { Assets } from "../../../../../assets/Assets";
import { getGroundMaterial } from "../../../../Materials/GroundMaterial";
import { PhongMaterialWithCloseCameraShader } from "../../../../Materials/PhongWithCloseCamera";
import { getShadowMaterial } from "../../../../Materials/ShadowMaterial";
import { IEntityInventoryData } from "../../../base/GameEntity/GameEntity";
import { CircleCollider } from "../../../base/IndependentGameEntity/Collider/CircleCollider/CircleCollider";
import { Pot } from "../Pot";

const assetName = "pot_1";
const clickGeometry = new CylinderGeometry(0.2, 0.15, 0.25, 6);
clickGeometry.translate(0, 0.125, 0);

export class Pot_1 extends Pot {
  collider = new CircleCollider(0.2);
  inventoryData: IEntityInventoryData = {
    title: "Pot_1",
  };
  isRotate = false;

  clickGeometry = clickGeometry;

  baseMesh = new Mesh(
    Assets.getGeometry(assetName),
    PhongMaterialWithCloseCameraShader({ map: Assets.getTexture("testUv") })
  );
  groundMesh = new Mesh(Assets.getGeometry(`${assetName}_ground`), getGroundMaterial());
  shadowMesh = new Mesh(Assets.getGeometry(`${assetName}_shadow`), getShadowMaterial());

  constructor() {
    super();
    this.init();
  }
}
