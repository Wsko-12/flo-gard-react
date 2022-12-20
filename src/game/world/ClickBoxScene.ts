import { Mesh, Object3D, Raycaster } from 'three';
import GameCamera from '../renderer/gameCamera/GameCamera';
import { ClickBox } from './objects/new/worldObject/clickBoxes/ClickBox';

export class ClickBoxScene {
  private static raycaster = new Raycaster();
  private static clickBoxes: ClickBox[] = [];
  private static clickBoxesMeshArray: Mesh[] = [];

  static click(clientX: number, clientY: number) {
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    const { raycaster } = this;
    raycaster.setFromCamera({ x, y }, GameCamera.getCamera());
    const intersects = raycaster.intersectObjects(this.clickBoxesMeshArray);
    if (intersects[0]) {
      this.callHitBoxClick(intersects[0].object);
    }
  }

  static callHitBoxClick(mesh: Object3D) {
    const clickBox = this.clickBoxes.find((clickBox) => clickBox.getMesh() === mesh);
    if (clickBox) {
      clickBox.click();
    }
  }

  static addClickBox(clickBox: ClickBox) {
    const isAdded = this.clickBoxes.includes(clickBox);
    if (isAdded) {
      return;
    }

    this.clickBoxes.push(clickBox);
    this.clickBoxesMeshArray.push(clickBox.getMesh());
  }

  static removeClickBox(clickBox: ClickBox) {
    {
      const index = this.clickBoxes.indexOf(clickBox);
      if (index === -1) {
        return;
      }
      this.clickBoxes.splice(index, 1);
    }

    {
      const index = this.clickBoxesMeshArray.indexOf(clickBox.getMesh());
      if (index === -1) {
        return;
      }
      this.clickBoxesMeshArray.splice(index, 1);
    }
  }
}
