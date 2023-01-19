import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import Assets from '../../../../../assets/Assets';
import { EColorsPallet } from '../../../../world/environment/utils/utils';
import { QuadCollider } from '../../../base/IndependentGameEntity/Collider/QuadCollider/QuadCollider';
import { Stand } from '../Stand';
const assetName = 'pallet_1';
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

  clickGeometry = new BoxGeometry(1.25, 0.25, 1.5);
  selectedColor = EColorsPallet.wood;
  mesh = new Mesh(
    Assets.getGeometry(assetName),
    new MeshPhongMaterial({
      map: Assets.getTexture(assetName),
      alphaTest: 0.5,
      shininess: 0,
      color: EColorsPallet.wood,
    })
  );
  constructor() {
    super();
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.init();
  }
}
