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
      alphaTest: 0.01,
      shininess: 0,
      color: EColorsPallet.wood,
    });

    material.onBeforeCompile = (shader) => {
      let fragment = shader.fragmentShader;

      fragment = fragment.replace(
        '#include <alphatest_fragment>',
        `
          float fDist = 1.0;
          float depth = gl_FragCoord.z / gl_FragCoord.w;
          if(depth < fDist){
            // closest to screen = 1.0;
            float far = 1.0 - depth / fDist;

            float x = (sin(gl_FragCoord.x) + 1.0) / 2.0;
            float xVal = step(far * 2.5, x);

            float y = (sin(gl_FragCoord.y) + 1.0) / 2.0;
            float yVal = step(far * 2.5, y);

            diffuseColor.a = (xVal + yVal) / 2.0;
          }
    
          #include <alphatest_fragment>
        `
      );

      shader.fragmentShader = fragment;
    };

    this.mesh.material = material;
    this.init();
  }
}
