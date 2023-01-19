import { BufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import { ClickBoxScene } from '../../../../world/ClickBoxScene/ClickBoxScene';
import { IndependentGameEntity } from '../IndependentGameEntity';

export class ClickBox {
  protected static material = new MeshBasicMaterial({
    wireframe: true,
    color: 0xff0000,
    visible: false,
  });
  private mesh: Mesh;
  public entity: IndependentGameEntity;
  constructor(geometry: BufferGeometry, entity: IndependentGameEntity) {
    this.mesh = new Mesh(geometry, ClickBox.material);
    this.entity = entity;
  }

  public onClick = () => {
    this.entity.onClick();
  };

  add() {
    ClickBoxScene.addClickBox(this);
  }

  remove() {
    ClickBoxScene.removeClickBox(this);
  }

  setPosition(x: number, y: number, z: number, angle: number) {
    this.mesh.position.set(x, z, y);
    this.mesh.rotation.set(0, angle, 0);
  }

  public getMesh() {
    return this.mesh;
  }
}
