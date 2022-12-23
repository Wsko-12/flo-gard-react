import { Mesh, MeshBasicMaterial } from 'three';
import { Point2 } from '../../../../world/environment/utils/Geometry';
import World from '../../../../world/World';
import { GameEntity } from '../../GameEntity/GameEntity';

export abstract class Collider {
  protected abstract mesh: Mesh;
  static material = new MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  });
  public position = new Point2(0, 0);

  public setPosition(x: number, y: number) {
    this.position.set(x, y);
    this.mesh.position.set(x, 0.001, y);
  }

  //abstract isCollision(): GameEntity | null;
  abstract isCollision(): boolean;
  abstract pressGrass(
    ctx: CanvasRenderingContext2D,
    resolution: number,
    position: Point2 | null
  ): void;

  public add() {
    World.getScene().add(this.mesh);
  }

  public remove() {
    World.getScene().remove(this.mesh);
  }
}
