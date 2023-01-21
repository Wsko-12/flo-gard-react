import { LinearFilter, MeshBasicMaterial } from 'three';
import Assets from '../../assets/Assets';

let saved: MeshBasicMaterial | null = null;
export const getShadowMaterial = () => {
  if (!saved) {
    const texture = Assets.getTexture('shadows');
    texture.magFilter = LinearFilter;
    saved = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.75,
    });
    saved.depthWrite = false;
  }

  return saved;
};
