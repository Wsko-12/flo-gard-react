import { Point2 } from '../../../../world/environment/utils/Geometry';
import { GameEntity } from '../../GameEntity/GameEntity';

export abstract class Collider {
  public position = new Point2(0, 0);

  public setPosition(x: number, y: number) {
    this.position.set(x, y);
  }

  abstract isCollision(): GameEntity | null;
  abstract pressGrass(
    ctx: CanvasRenderingContext2D,
    resolution: number,
    position: Point2 | null
  ): void;
}
