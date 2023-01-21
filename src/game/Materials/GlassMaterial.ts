import { DoubleSide } from 'three';
import { EColorsPallet } from '../world/environment/utils/utils';
import { PhongMaterialWithCloseCameraShader } from './PhongWithCloseCamera';

export const getGlassMaterial = (closeCameraDistance: number | undefined = undefined) => {
  const material = PhongMaterialWithCloseCameraShader(
    {
      opacity: 0.25,
      transparent: true,
      shininess: 100,
      side: DoubleSide,
    },
    closeCameraDistance
  );
  material.userData.staticColor = EColorsPallet.glass;
  material.depthWrite = false;

  return material;
};
