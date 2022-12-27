import { Mesh, PlaneGeometry, Vector3 } from 'three';
import { Grass } from '../../../../../world/environment/grass/Grass';
import { Point2, Quad } from '../../../../../world/environment/utils/Geometry';
import { EntityManager } from '../../../../EntityManager';
import { IndependentGameEntity } from '../../IndependentGameEntity';
import { CircleCollider } from '../CircleCollider/CircleCollider';
import { Collider } from '../Collider';

export class QuadCollider extends Collider {
  static getMeshByCorners(corners: Point2[]) {
    const points: Vector3[] = [];
    corners.forEach(({ x, y }) => points.push(new Vector3(x, 0, y)));
    const plane = new PlaneGeometry(2, 2);
    plane.rotateX(Math.PI / 2);
    const atr = plane.getAttribute('position');
    const array = atr.array as number[];
    for (let i = 0; i < atr.count; i++) {
      let pI = i;
      // change D to C and C to D for correct mesh edges
      if (i === 2) {
        pI = 3;
      }
      if (i === 3) {
        pI = 2;
      }
      array[i * 3] = corners[pI].x;
      array[i * 3 + 1] = 0;
      array[i * 3 + 2] = corners[pI].y;
    }

    return new Mesh(plane, Collider.material);
  }
  protected mesh: Mesh;
  private corners: Point2[];
  constructor(corners: [number, number][]) {
    /*     
   **corners** 
   0        1
    |¯¯¯¯¯¯|
    |      |
    |______|
   3        2

   A        B
    |¯¯¯¯¯¯|
    |      |
    |______|
   D        C
    */
    super();
    this.corners = corners.map(([x, y]) => new Point2(x, y));
    this.mesh = QuadCollider.getMeshByCorners(this.corners);
  }

  public getPoints(position?: Point2 | null, rotation?: number): [Point2, Point2, Point2, Point2] {
    const points = this.corners.map((point) => point.clone());

    let { x, y } = this.position;
    let angle = this.rotation;

    if (position && rotation !== undefined) {
      // its only for grass paint
      x = position.x;
      y = position.y;
      angle = rotation;
    }

    points.forEach((point) => point.rotate(-angle));
    points.forEach((point) => point.translate(x, y));

    return points as [Point2, Point2, Point2, Point2];
  }

  public isCollision() {
    const intersections: IndependentGameEntity[] = [];
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
        intersections.push(entity);
      }
    }
    return intersections.length ? intersections : null;
  }

  public getQuad() {
    const points = this.getPoints();
    return new Quad(points);
  }

  public checkCollision(collider: Collider) {
    if (collider instanceof CircleCollider) {
      return this.getQuad().isCollideCircle(collider.getCircle());
    }
    if (collider instanceof QuadCollider) {
      return this.getQuad().isCollideQuad(collider.getQuad());
    }
    return false;
  }

  public pressGrass(ctx: CanvasRenderingContext2D, position: Point2 | null, rotation: number) {
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

      const { x: pX, y: pY } = points[i];
      const { x, y } = Grass.getCanvasXY(pX, pY);

      if (i === 0) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(x, y);
        continue;
      }
      ctx.lineTo(x, y);
    }
  }
}
