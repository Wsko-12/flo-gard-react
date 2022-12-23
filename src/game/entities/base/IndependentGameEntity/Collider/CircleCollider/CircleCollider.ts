import { GROUND_SIZE } from '../../../../../world/environment/ground/Ground';
import { Point2 } from '../../../../../world/environment/utils/Geometry';
import { EntityManager } from '../../../../EntityManager';
import { IndependentGameEntity } from '../../IndependentGameEntity';
import { Collider } from '../Collider';

export class CircleCollider extends Collider {
  public r: number;
  constructor(r: number) {
    super();
    this.r = r;
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
    return false;
  }

  private checkCircleCollider(collider: CircleCollider) {
    const distance = this.position.getDistanceTo(collider.position);
    const rSum = this.r + collider.r;
    return distance < rSum;
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
