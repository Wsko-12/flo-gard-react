import { Mesh, PlaneGeometry, Vector3 } from 'three';
import { GROUND_SIZE } from '../../../../../world/environment/ground/Ground';
import { Circle, Point2, Quad } from '../../../../../world/environment/utils/Geometry';
import { EntityManager } from '../../../../EntityManager';
import { IndependentGameEntity } from '../../IndependentGameEntity';
import { CircleCollider } from '../CircleCollider/CircleCollider';
import { Collider } from '../Collider';

export class QuadCollider extends Collider {
  protected mesh: Mesh;
  private corners: Point2[];
  constructor(corners: [number, number][]) {
    super();
    this.corners = corners.map(([x, y]) => new Point2(x, y));

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

  getPoints(position?: Point2 | null, rotation?: number): [Point2, Point2, Point2, Point2] {
    const points = this.corners.map((point) => point.clone());

    if (position && rotation !== undefined) {
      // its only for grass paint
      points.forEach((point) => point.rotate(-rotation));
      const { x, y } = position;
      points.forEach((point) => point.translate(x, y));
    } else {
      points.forEach((point) => point.rotate(-this.rotation));
      const { x, y } = this.position;
      points.forEach((point) => point.translate(x, y));
    }

    return points as [Point2, Point2, Point2, Point2];
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
  pressGrass(
    ctx: CanvasRenderingContext2D,
    resolution: number,
    position: Point2 | null,
    rotation: number
  ) {
    if (!position) {
      return;
    }
    const points = this.getPoints(position, rotation);
    for (let i = 0; i <= points.length; i++) {
      if (i === points.length) {
        ctx.fill();
        ctx.restore();
        return;
      }

      const { x, y } = points[i];
      const canvas_x = ((x + GROUND_SIZE / 2) / (GROUND_SIZE / 2)) * (resolution / 2);
      const canvas_y = ((y + GROUND_SIZE / 2) / (GROUND_SIZE / 2)) * (resolution / 2);
      if (i === 0) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(canvas_x, canvas_y);
        continue;
      }
      ctx.lineTo(canvas_x, canvas_y);
    }
  }
}
