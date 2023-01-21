import { DoubleSide, MeshPhongMaterial } from 'three';
import { EColorsPallet } from '../world/environment/utils/utils';
import { PhongMaterialWithCloseCameraShader } from './PhongWithCloseCamera';

let saved: MeshPhongMaterial | null = null;

export const getGlassMaterial = (closeCameraDistance: number | undefined = undefined) => {
  if (!saved) {
    saved = PhongMaterialWithCloseCameraShader(
      {
        opacity: 0.25,
        transparent: true,
        shininess: 100,
        side: DoubleSide,
      },
      closeCameraDistance
    );
    saved.userData.staticColor = EColorsPallet.glass;
    saved.depthWrite = false;
  }

  return saved;
};
