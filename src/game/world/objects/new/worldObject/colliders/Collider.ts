import { Point2 } from '../../../../environment/utils/Geometry';

export abstract class Collider {
  abstract position: Point2;
  abstract isCollision(): boolean;

  abstract updateGrassHeight(
    ctx: CanvasRenderingContext2D,
    resolution: number,
    position: { x: number; y: number } | null
  ): void;
}
