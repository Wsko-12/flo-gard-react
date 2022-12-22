import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { IEntityInventoryData } from '../base/GameEntity/GameEntity';
import { IndependentGameEntity } from '../base/IndependentGameEntity/IndependentGameEntity';

export class Sphere extends IndependentGameEntity {
  inventoryData: IEntityInventoryData = {
    title: 'Sphere',
  };

  clickGeometry = new SphereGeometry();
  mesh = new Mesh(new SphereGeometry(), new MeshBasicMaterial());
  constructor() {
    super();
    this.init();
  }
}
