import { BoxGeometry, DoubleSide, Mesh, MeshPhongMaterial } from 'three';
import { QuadCollider } from '../../../base/IndependentGameEntity/Collider/QuadCollider/QuadCollider';
import { GreenHouse } from '../GreenHouse';

export class GreenHouse_1 extends GreenHouse {
  protected yShift = 0.5;
  collider = new QuadCollider([
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1],
  ]);
  inventoryData = {
    title: 'GreenHouse_1',
  };
  isRotate = true;

  clickGeometry = new BoxGeometry(2, 2, 2);
  mesh = new Mesh(
    new BoxGeometry(2, 2, 2),
    new MeshPhongMaterial({
      transparent: true,
      opacity: 0.1,
      shininess: 0,
      color: 0xffffff,
      side: DoubleSide,
    })
  );
  constructor() {
    super();
    this.init();
  }
}
