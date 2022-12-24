import { CylinderGeometry, Group, Mesh, MeshPhongMaterial } from 'three';
import Assets from '../../../../../assets/Assets';
import { IEntityInventoryData } from '../../../base/GameEntity/GameEntity';
import { CircleCollider } from '../../../base/IndependentGameEntity/Collider/CircleCollider/CircleCollider';
import { Pot } from '../Pot';

const assetName = 'pot_1';
export class Pot_1 extends Pot {
  collider = new CircleCollider(0.2);
  inventoryData: IEntityInventoryData = {
    title: 'Pot_1',
  };
  isRotate = false;

  clickGeometry = new CylinderGeometry(0.2, 0.12, 0.5, 6);
  mesh = new Group();
  potMesh = new Mesh(
    Assets.getGeometry(assetName),
    new MeshPhongMaterial({ transparent: true, opacity: 0.1, map: Assets.getTexture('testUv') })
  );
  groundMesh = new Mesh(
    Assets.getGeometry(`${assetName}_ground`),
    new MeshPhongMaterial({
      transparent: true,
      opacity: 0.1,
      map: Assets.getTexture('pots_ground'),
    })
  );
  constructor() {
    super();
    this.init();
  }
}
