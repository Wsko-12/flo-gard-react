import { Mesh, Raycaster, Vector2 } from 'three';
import { ClickBox } from '../../entities/base/IndependentGameEntity/ClickBox/ClickBox';
import GameCamera from '../../renderer/gameCamera/GameCamera';
import World from '../World';

export class ClickBoxScene {
  private static clickBoxes: ClickBox[] = [];
  private static meshes: Mesh[] = [];
  private static raycaster = new Raycaster();

  public static addClickBox(clickBox: ClickBox) {
    const isAdded = this.clickBoxes.includes(clickBox);
    if (isAdded) {
      return;
    }
    this.clickBoxes.push(clickBox);

    const mesh = clickBox.getMesh();
    World.getScene().add(mesh);
    this.meshes.push(mesh);
  }

  public static removeClickBox(clickBox: ClickBox) {
    const index = this.clickBoxes.indexOf(clickBox);
    if (index === -1) {
      return;
    }
    this.clickBoxes.splice(index, 1);
    this.meshes.splice(index, 1);
    World.getScene().remove(clickBox.getMesh());
  }

  public static click(clientX: number, clientY: number) {
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(new Vector2(x, y), GameCamera.getCamera());

    const intersects = this.raycaster.intersectObjects(this.meshes);
    if (intersects[0]) {
      const mesh = intersects[0].object as Mesh;
      const index = this.meshes.indexOf(mesh);
      const clickBox = this.clickBoxes[index];
      if (clickBox) {
        clickBox.onClick();
      }
    }
  }
}
