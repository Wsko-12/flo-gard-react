import { IPosition2 } from '../../../../../../../ts/interfaces';
import { Point2 } from '../../../../../environment/utils/Geometry';
import { GameEntity } from '../../GameEntity';

export abstract class Collider {
  abstract position: Point2;
  abstract isCollision(): GameEntity | null;
  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }
  abstract updateGrassHeight(
    ctx: CanvasRenderingContext2D,
    resolution: number,
    position: IPosition2 | null
  ): void;
}
