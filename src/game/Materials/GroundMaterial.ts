import { MeshPhongMaterial } from 'three';
import Assets from '../../assets/Assets';
import { EColorsPallet } from '../world/environment/utils/utils';
import { PhongMaterialWithCloseCameraShader } from './PhongWithCloseCamera';

let saved: MeshPhongMaterial | null = null;

export const getGroundMaterial = (closeCameraDistance: number | undefined = undefined) => {
  if (!saved) {
    saved = PhongMaterialWithCloseCameraShader(
      {
        map: Assets.getTexture('pots_ground'),
        shininess: 0,
      },
      closeCameraDistance
    );
    saved.userData.staticColor = EColorsPallet.glass;
    saved.depthWrite = false;
  }

  return saved;
};
