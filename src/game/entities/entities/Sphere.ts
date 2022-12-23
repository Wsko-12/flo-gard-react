import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { IEntityInventoryData } from '../base/GameEntity/GameEntity';
import { CircleCollider } from '../base/IndependentGameEntity/Collider/CircleCollider/CircleCollider';
import { IndependentGameEntity } from '../base/IndependentGameEntity/IndependentGameEntity';

export class Sphere extends IndependentGameEntity {
  inventoryData: IEntityInventoryData = {
    title: 'Sphere',
  };
  collider = new CircleCollider(0.5);
  clickGeometry = new SphereGeometry(0.5);
  isRotate = false;
  mesh = new Mesh(
    new SphereGeometry(0.5),
    new MeshBasicMaterial({ transparent: true, opacity: 0.1 })
  );
  constructor() {
    super();
    this.init();
  }

  protected move(): void {
    if (!this.isOnMove) {
      return;
    }
    super.move();
    const isCollision = this.collider.isCollision();
    if (this.mesh.material.transparent != !!isCollision) {
      this.mesh.material.transparent = !!isCollision;
    }
  }
}
