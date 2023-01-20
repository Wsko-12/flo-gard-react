import { CylinderGeometry, Group, Mesh, MeshPhongMaterial } from 'three';
import Assets from '../../../../../assets/Assets';
import { IEntityInventoryData } from '../../../base/GameEntity/GameEntity';
import { CircleCollider } from '../../../base/IndependentGameEntity/Collider/CircleCollider/CircleCollider';
import { Pot } from '../Pot';

const assetName = 'pot_1';
const clickGeometry = new CylinderGeometry(0.2, 0.15, 0.25, 6);
clickGeometry.translate(0, 0.125, 0);
export class Pot_1 extends Pot {
  collider = new CircleCollider(0.2);
  inventoryData: IEntityInventoryData = {
    title: 'Pot_1',
  };
  isRotate = false;

  clickGeometry = clickGeometry;
  mesh = new Group();
  potMesh = new Mesh(
    Assets.getGeometry(assetName),
    new MeshPhongMaterial({ map: Assets.getTexture('testUv') })
  );
  groundMesh = new Mesh(
    Assets.getGeometry(`${assetName}_ground`),
    new MeshPhongMaterial({
      map: Assets.getTexture('pots_ground'),
      shininess: 0,
    })
  );
  constructor() {
    super();
    this.groundMesh.userData.staticColor = true;
    this.init();
  }
}
