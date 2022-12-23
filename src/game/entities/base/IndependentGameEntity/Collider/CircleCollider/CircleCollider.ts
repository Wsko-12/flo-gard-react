import { CircleGeometry, Mesh } from 'three';
import { GROUND_SIZE } from '../../../../../world/environment/ground/Ground';
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
    return thisCircle.isCircleIn(colliderCircle);
  }

  public pressGrass(
    ctx: CanvasRenderingContext2D,
    resolution: number,
    position: Point2 | null
  ): void {
    if (!position) {
      return;
    }
    const { x, y } = position;
    const r = this.r * 2;
    const canvas_x = ((x + GROUND_SIZE / 2) / (GROUND_SIZE / 2)) * (resolution / 2);
    const canvas_y = ((y + GROUND_SIZE / 2) / (GROUND_SIZE / 2)) * (resolution / 2);
    const radius = (r / (GROUND_SIZE * 1.5)) * resolution;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas_x, canvas_y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
