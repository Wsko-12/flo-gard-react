import { Mesh, PlaneGeometry, Vector3 } from 'three';
import { Circle, Point2, Quad } from '../../../../../world/environment/utils/Geometry';
import { EntityManager } from '../../../../EntityManager';
import { IndependentGameEntity } from '../../IndependentGameEntity';
import { CircleCollider } from '../CircleCollider/CircleCollider';
import { Collider } from '../Collider';

export class QuadCollider extends Collider {
  protected mesh: Mesh;
  constructor(corners: [number, number][]) {
    super();
    const points: Vector3[] = [];
    corners.forEach(([x, z]) => points.push(new Vector3(x, 0, z)));
    const plane = new PlaneGeometry(2, 2);
    plane.rotateX(Math.PI / 2);
    const atr = plane.getAttribute('position');
    const array = atr.array as number[];
    for (let i = 0; i < atr.count; i++) {
      array[i * 3] = corners[i][0];
      array[i * 3 + 1] = 0;
      array[i * 3 + 2] = corners[i][1];
    }

    this.mesh = new Mesh(plane, Collider.material);
  }

  getPoints(): [Point2, Point2, Point2, Point2] {
    const geometry = this.mesh.geometry.clone();
    geometry.translate(this.position.x, 0, this.position.y);
    const array = Array.from(geometry.getAttribute('position').array);
    const A = array.splice(0, 3);
    const B = array.splice(0, 3);
    // here D must be first;
    const D = array.splice(0, 3);
    const C = array.splice(0, 3);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return [A, B, C, D].map(([x, _, y]) => new Point2(x, y)) as [Point2, Point2, Point2, Point2];
  }

  isCollision() {
    const entities = EntityManager.getEntities();
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (entity.inInventory) {
        continue;
      }
      if (!(entity instanceof IndependentGameEntity)) {
        continue;
      }

      const collider = entity.getCollider();

      if (collider === this) {
        continue;
      }

      const isCollide = this.checkCollision(collider);
      if (isCollide) {
        return entity;
      }
    }
    return null;
  }
  private checkCircleCollider(collider: CircleCollider) {
    const points = this.getPoints();
    const quad = new Quad(points);
    const circle = new Circle(collider.position, collider.r);
    return quad.isCircleIn(circle);
  }

  private checkQuadCollider(collider: QuadCollider) {
    const points = this.getPoints();
    const thisQuad = new Quad(points);
    const colliderQuad = new Quad(collider.getPoints());
    return thisQuad.isQuadIn(colliderQuad);
  }

  checkCollision(collider: Collider) {
    if (collider instanceof CircleCollider) {
      return this.checkCircleCollider(collider);
    }
    if (collider instanceof QuadCollider) {
      return this.checkQuadCollider(collider);
    }
    return false;
  }
  pressGrass() {}
}
