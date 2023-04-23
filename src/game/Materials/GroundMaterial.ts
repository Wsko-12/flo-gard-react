import { Assets } from "../../assets/Assets";
import { EColorsPallet } from "../world/environment/utils/utils";
import { PhongMaterialWithCloseCameraShader } from "./PhongWithCloseCamera";

export const getGroundMaterial = (closeCameraDistance: number | undefined = undefined) => {
  const material = PhongMaterialWithCloseCameraShader(
    {
      map: Assets.getTexture("pots_ground"),
      shininess: 0,
    },
    closeCameraDistance
  );

  material.userData.staticColor = EColorsPallet.white;
  material.depthWrite = false;

  return material;
};
