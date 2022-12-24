import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { EGameEntityTypes, IEntityInventoryData } from '../base/GameEntity/GameEntity';
import { QuadCollider } from '../base/IndependentGameEntity/Collider/QuadCollider/QuadCollider';
import { IndependentGameEntity } from '../base/IndependentGameEntity/IndependentGameEntity';

export class Cube extends IndependentGameEntity {
  type = EGameEntityTypes.test;
  collider = new QuadCollider([
    [-0.5, 0.5],
    [0.5, 0.5],
    [0.5, -0.5],
    [-0.5, -0.5],
  ]);
  inventoryData: IEntityInventoryData = {
    title: 'Cube',
  };
  isRotate = true;

  clickGeometry = new BoxGeometry();
  mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ transparent: true, opacity: 0.1 }));
  constructor() {
    super();
    this.init();
  }
}
