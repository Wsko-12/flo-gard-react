import { MeshPhongMaterial, MeshPhongMaterialParameters } from 'three';
import { applyCloseCameraShader } from './shaders/closeCamera';

export const PhongMaterialWithCloseCameraShader = (
  parameters: MeshPhongMaterialParameters,
  distance = 0.5
) => {
  if (!parameters.alphaTest) {
    parameters.alphaTest = 0.1;
  }
  const material = new MeshPhongMaterial(parameters);
  material.onBeforeCompile = (shader) => applyCloseCameraShader(shader, distance);
  return material;
};
