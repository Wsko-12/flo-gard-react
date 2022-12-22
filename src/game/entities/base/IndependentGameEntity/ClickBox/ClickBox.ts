import { BufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import { ClickBoxScene } from '../../../../world/ClickBoxScene/ClickBoxScene';

export class ClickBox {
  protected static material = new MeshBasicMaterial({
    wireframe: true,
    color: 0xff0000,
  });
  private mesh: Mesh;
  public onClick: () => void;
  constructor(geometry: BufferGeometry, onClick: () => void) {
    this.mesh = new Mesh(geometry, ClickBox.material);
    this.onClick = onClick;
  }

  add() {
    ClickBoxScene.addClickBox(this);
  }

  remove() {
    ClickBoxScene.removeClickBox(this);
  }

  setPosition(x: number, y: number) {
    this.mesh.position.set(x, 0, y);
  }

  public getMesh() {
    return this.mesh;
  }
}
