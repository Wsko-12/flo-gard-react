import { CylinderGeometry, Mesh, MeshPhongMaterial } from 'three';
import Assets from '../../../../assets/Assets';
import { IEntityInventoryData } from '../../base/GameEntity/GameEntity';
import { CircleCollider } from '../../base/IndependentGameEntity/Collider/CircleCollider/CircleCollider';
import { IndependentGameEntity } from '../../base/IndependentGameEntity/IndependentGameEntity';

const assetName = 'pot_1';
export class Pot extends IndependentGameEntity {
  collider = new CircleCollider(0.2);
  inventoryData: IEntityInventoryData = {
    title: 'Pot',
  };
  isRotate = false;

  clickGeometry = new CylinderGeometry(0.2, 0.12, 0.5, 6);
  mesh = new Mesh(
    Assets.getGeometry(assetName),
    new MeshPhongMaterial({ transparent: true, opacity: 0.1, map: Assets.getTexture('testUv') })
  );
  constructor() {
    super();
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.init();
  }
}
