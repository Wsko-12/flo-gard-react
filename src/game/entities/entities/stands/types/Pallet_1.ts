import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import Assets from '../../../../../assets/Assets';
import { GameStore } from '../../../../gameStore/GameStore';
import { EColorsPallet } from '../../../../world/environment/utils/utils';
import { QuadCollider } from '../../../base/IndependentGameEntity/Collider/QuadCollider/QuadCollider';
import { Stand } from '../Stand';
const assetName = 'pallet_1';
const clickGeometry = new BoxGeometry(1.25, 0.12, 1.5);
clickGeometry.translate(0, 0.055, 0);
export class Pallet_1 extends Stand {
  protected yShift = 0.125;
  collider = new QuadCollider([
    [-0.65, 0.75],
    [0.65, 0.75],
    [0.65, -0.75],
    [-0.65, -0.75],
  ]);
  inventoryData = {
    title: 'Pallet_1',
  };
  isRotate = true;

  clickGeometry = clickGeometry;
  selectedColor = EColorsPallet.wood;
  mesh = new Mesh(Assets.getGeometry(assetName));
  constructor() {
    super();
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    const material = new MeshPhongMaterial({
      map: Assets.getTexture(assetName),
      alphaTest: 0.1,
      shininess: 0,
      color: EColorsPallet.wood,
    });

    material.onBeforeCompile = (shader) => {
      let fragment = shader.fragmentShader;
      let vertex = shader.vertexShader;
      shader.uniforms.vCamera = GameStore.cameraPosition;

      vertex = vertex.replace(
        '#include <clipping_planes_pars_vertex>',
        `#include <clipping_planes_pars_vertex>
         varying vec4 vvPos;
         varying float vCameraDistance;
         uniform vec3 uCamPos;
      `
      );
      vertex = vertex.replace(
        '#include <fog_vertex>',
        `#include <fog_vertex>
          vec4 vWorldPosition = modelViewMatrix * vec4(position, 1.0);
          vCameraDistance = distance(	vec3(vWorldPosition.xyz), uCamPos);
          vvPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      `
      );

      shader.vertexShader = vertex;

      fragment = fragment.replace(
        '#include <clipping_planes_pars_fragment>',
        `#include <clipping_planes_pars_fragment>
         varying vec4 vvPos;
         varying float vCameraDistance;
        `
      );

      fragment = fragment.replace(
        '#include <dithering_fragment>',
        `
          #include <dithering_fragment>
        	vec2 vCoords = vvPos.xy;
      		vCoords /= vvPos.w;
      		vCoords = vCoords * 0.5 + 0.5;

        	vec2 vecUv = fract( vCoords * 1.0 );

          float fDist = 1.0;
          if(vCameraDistance < fDist){
            float far = vCameraDistance / fDist;
            float x = (sin(vecUv.x * (1000.0)) + 1.0) / 2.0;
            float y = (sin(vecUv.y * (1000.0)) + 1.0) / 2.0;
           
            float farCube = far * far * far;
            float xVal = 1.0 - step(farCube, x);
            float yVal = 1.0 - step(farCube, y);

            float alpha = xVal * yVal;
          
            diffuseColor.a = alpha;
          }

          #include <alphatest_fragment>
        `
      );

      //       const fragmentShader = `
      // 	varying vec4 vvPos;

      //   void main() {
      //   	vec2 vCoords = vvPos.xy;
      // 		vCoords /= vvPos.w;
      // 		vCoords = vCoords * 0.5 + 0.5;

      //   	vec2 vecUv = fract( vCoords * 1.0 );
      //     gl_FragColor = vec4( vecUv, 0.0, 1.0 );
      //   }
      // `;

      shader.fragmentShader = fragment;
    };

    this.mesh.material = material;
    this.init();
  }
}
