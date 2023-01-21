import { BoxGeometry, Group, Mesh } from 'three';
import Assets from '../../../../../assets/Assets';
import { PhongMaterialWithCloseCameraShader } from '../../../../Materials/PhongWithCloseCamera';
import { getShadowMaterial } from '../../../../Materials/ShadowMaterial';
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
  mesh = new Group();
  constructor() {
    super();
    const mesh = new Mesh(Assets.getGeometry(assetName));
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const material = PhongMaterialWithCloseCameraShader({
      map: Assets.getTexture(assetName),
      alphaTest: 0.01,
      shininess: 0,
      color: EColorsPallet.wood,
    });

    mesh.material = material;

    const shadow = new Mesh(Assets.getGeometry(`${assetName}_shadow`), getShadowMaterial());

    this.mesh.add(mesh, shadow);
    this.init();
  }
}
