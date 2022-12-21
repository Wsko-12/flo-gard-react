import { BufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import { ClickBoxScene } from '../../../../../ClickBoxScene';
import World from '../../../../../World';

export class ClickBox {
  protected static material = new MeshBasicMaterial({
    visible: false,
    color: 0xff0000,
    wireframe: true,
    wireframeLinewidth: 3,
  });

  protected mesh: Mesh;
  private onClick: () => void = () => {};

  constructor(geometry: BufferGeometry, onClick: () => void) {
    this.mesh = new Mesh(geometry, ClickBox.material);
    this.onClick = onClick;
  }

  public add() {
    ClickBoxScene.addClickBox(this);
    World.getScene().add(this.mesh);
  }

  public setMeshPosition(x: number, y: number) {
    this.mesh.position.set(x, 0, y);
  }

  public remove() {
    ClickBoxScene.removeClickBox(this);
    World.getScene().remove(this.mesh);
  }

  public getMesh() {
    return this.mesh;
  }

  public click() {
    this.onClick();
  }
}
