import { Mesh, MeshBasicMaterial } from "three";
import { Point2 } from "../../../../world/environment/utils/Geometry";
import { World } from "../../../../world/World";
import { IndependentGameEntity } from "../IndependentGameEntity";

export abstract class Collider {
  protected abstract mesh: Mesh;
  static material = new MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
    visible: false,
  });
  public position = new Point2(0, 0);
  public rotation = 0;

  public setPosition(x: number, y: number, angle: number) {
    this.position.set(x, y);
    this.mesh.position.set(x, 0.001, y);
    this.mesh.rotation.set(0, angle, 0);
    this.rotation = angle;
  }

  abstract isCollision(): IndependentGameEntity[] | null;

  abstract isColliderInside(collider: Collider): boolean;

  abstract pressGrass(
    ctx: CanvasRenderingContext2D,
    position: Point2 | null,
    rotation: number
  ): void;

  public add() {
    World.getScene().add(this.mesh);
  }

  public remove() {
    World.getScene().remove(this.mesh);
  }
}
