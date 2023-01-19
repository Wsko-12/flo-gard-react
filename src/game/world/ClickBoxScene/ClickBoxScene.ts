import { Intersection, Mesh, Object3D, Raycaster, Vector2 } from 'three';
import { EGameEntityTypes } from '../../entities/base/GameEntity/GameEntity';
import { ClickBox } from '../../entities/base/IndependentGameEntity/ClickBox/ClickBox';
import GameCamera from '../../renderer/gameCamera/GameCamera';
import World from '../World';

export class ClickBoxScene {
  private static clickBoxes: ClickBox[] = [];
  private static meshes: Mesh[] = [];
  private static raycaster = new Raycaster();

  private static getClickBoxFromIntersection = (object: Intersection<Object3D>) => {
    const mesh = object.object as Mesh;
    const index = ClickBoxScene.meshes.indexOf(mesh);
    const clickBox = ClickBoxScene.clickBoxes[index];
    return clickBox;
  };

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

    const firstClickBox = this.getClickBoxFromIntersection(intersects[0]);
    if (!firstClickBox) {
      return;
    }
    const firstEntity = firstClickBox.entity;
    if (firstEntity.type != EGameEntityTypes.greenHouse || !intersects[1]) {
      firstClickBox.onClick();
      return;
    }

    const secondClickBox = this.getClickBoxFromIntersection(intersects[1]);
    if (secondClickBox) {
      secondClickBox.onClick();
    }
  }
}
