import { IPosition2 } from '../../../../../../../../ts/interfaces';
import { GROUND_SIZE } from '../../../../../../environment/ground/Ground';
import { Point2 } from '../../../../../../environment/utils/Geometry';
import { EntityManager } from '../../../../../EntityManager';
import { Collider } from '../Collider';

export class CircleCollider extends Collider {
  position = new Point2(0, 0);
  r: number;
  constructor(radius: number) {
    super();
    this.r = radius;
  }

  isCollision() {
    const entities = EntityManager.getEntities();
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];

      if (entity.inInventory) {
        continue;
      }

      const collider = entity.getCollider();
      if (!collider || collider === this) {
        continue;
      }

      if (collider instanceof CircleCollider) {
        const isCollide = this.checkCircleCollider(collider);
        if (isCollide) {
          return entity;
        }
      }
    }
    return null;
  }

  checkCircleCollider(collider: CircleCollider) {
    const distance = this.position.getDistanceTo(collider.position);
    return distance < this.r + collider.r;
  }

  updateGrassHeight(
    ctx: CanvasRenderingContext2D,
    resolution: number,
    position: IPosition2 | null
  ): void {
    if (!position) {
      return;
    }
    const { x, y } = position;
    const r = this.r * 3;
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