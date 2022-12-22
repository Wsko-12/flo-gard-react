import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { IEntityInventoryData } from '../base/GameEntity/GameEntity';
import { IndependentGameEntity } from '../base/IndependentGameEntity/IndependentGameEntity';

export class Cube extends IndependentGameEntity {
  inventoryData: IEntityInventoryData = {
    title: 'Cube',
  };

  clickGeometry = new BoxGeometry();
  mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
  constructor() {
    super();
    this.init();
  }
}
