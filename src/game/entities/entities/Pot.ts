import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { IEntityInventoryData } from '../base/GameEntity/GameEntity';
import { IndependentGameEntity } from '../base/IndependentGameEntity/IndependentGameEntity';

export class Pot extends IndependentGameEntity {
  inventoryData: IEntityInventoryData = {
    title: 'Pot',
  };

  mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
  constructor() {
    super();
    this.init();
  }
}
