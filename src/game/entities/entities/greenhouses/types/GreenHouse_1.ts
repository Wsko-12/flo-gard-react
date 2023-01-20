import { DoubleSide, Group, Mesh, MeshPhongMaterial } from 'three';
import Assets from '../../../../../assets/Assets';
import { EColorsPallet } from '../../../../world/environment/utils/utils';
import { QuadCollider } from '../../../base/IndependentGameEntity/Collider/QuadCollider/QuadCollider';
import { GreenHouse } from '../GreenHouse';

const assetName = 'greenhouse_1';

export class GreenHouse_1 extends GreenHouse {
  protected yShift = 0.125;
  collider = new QuadCollider([
    [-1, 1.4],
    [1, 1.4],
    [1, -1.4],
    [-1, -1.4],
  ]);
  inventoryData = {
    title: 'GreenHouse_1',
  };
  isRotate = true;

  clickGeometry = Assets.getGeometry(assetName);
  mesh = new Group();
  constructor() {
    super();
    const floorMesh = new Mesh(
      Assets.getGeometry(`${assetName}_floor`),
      new MeshPhongMaterial({
        map: Assets.getTexture(assetName),
        alphaTest: 0.5,
        shininess: 0,
      })
    );
    const glassMesh = new Mesh(
      Assets.getGeometry(assetName),
      new MeshPhongMaterial({
        opacity: 0.25,
        transparent: true,
        shininess: 100,
      })
    );
    glassMesh.userData.staticColor = EColorsPallet.glass;
    floorMesh.userData.staticColor = EColorsPallet.white;
    const mesh = new Mesh(
      Assets.getGeometry(assetName),
      new MeshPhongMaterial({
        map: Assets.getTexture(assetName),
        alphaTest: 0.5,
        shininess: 0,
        color: 0xff00ff,
        side: DoubleSide,
      })
    );

    this.mesh.add(mesh, floorMesh, glassMesh);
    this.init();
  }
}
