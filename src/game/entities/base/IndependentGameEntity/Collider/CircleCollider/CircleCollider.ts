import { CircleGeometry, Mesh } from 'three';
import { Grass } from '../../../../../world/environment/grass/Grass';
import { Circle, Point2 } from '../../../../../world/environment/utils/Geometry';
import { EntityManager } from '../../../../EntityManager';
import { IndependentGameEntity } from '../../IndependentGameEntity';
import { Collider } from '../Collider';
import { QuadCollider } from '../QuadCollider/QuadCollider';

export class CircleCollider extends Collider {
  public r: number;
  protected mesh: Mesh;
  constructor(r: number) {
    super();
    this.r = r;

    const geometry = new CircleGeometry(r * 1.005, 16);
    geometry.rotateX(Math.PI / 2);
    this.mesh = new Mesh(geometry, Collider.material);
  }

  isCollision() {
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

  private checkCollision(collider: Collider) {
    if (collider instanceof CircleCollider) {
      return this.checkCircleCollider(collider);
    }
    if (collider instanceof QuadCollider) {
      return collider.checkCollision(this);
    }
    return false;
  }

  private checkCircleCollider(collider: CircleCollider) {
    const thisCircle = new Circle(this.position, this.r);
    const colliderCircle = new Circle(collider.position, collider.r);
    return thisCircle.isCollideCircle(colliderCircle);
  }

  public pressGrass(ctx: CanvasRenderingContext2D, position: Point2 | null): void {
    if (!position) {
      return;
    }
    const { x: pX, y: pY } = position;
    const { x, y } = Grass.getCanvasXY(pX, pY);
    const radius = Grass.translateToCanvasPixels(this.r + 0.25);
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
