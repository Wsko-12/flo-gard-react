import { BufferGeometry, Group, Mesh } from 'three';
import { Point2 } from '../../../environment/utils/Geometry';
import { MoveDecorator } from '../decorators/MoveDecorator';
import { IWorldObjectStoreData } from '../interfaces';
import { ClickBox } from './clickBoxes/ClickBox';
import { Collider } from './colliders/Collider';

export abstract class WorldObject {
  protected collider: Collider | null = null;
  public position: Point2 | null = null;
  protected mesh: Mesh | Group | null = null;
  protected clickBoxGeometry: BufferGeometry | null = null;

  protected moveDecorator: MoveDecorator | null = null;
  protected clickBox: ClickBox | null = null;
  constructor() {
    this.position = new Point2(0, 0);
  }

  protected applyDecorators() {
    if (this.clickBoxGeometry) {
      this.clickBox = new ClickBox(this.clickBoxGeometry, this.onClick);
      this.moveDecorator = new MoveDecorator(this);
    }
  }

  public setMeshPosition(x: number, y: number) {
    if (!this.mesh) {
      return;
    }

    this.mesh.position.set(x, 0, y);

    if (this.clickBox) {
      this.clickBox.setMeshPosition(x, y);
    }
  }

  public setPosition(x: number, y: number) {
    this.setMeshPosition(x, y);
    this.position = new Point2(x, y);
  }

  protected onClick = () => {};

  public getMesh() {
    return this.mesh;
  }

  public setStoreData(storeData: IWorldObjectStoreData) {
    if (storeData.position) {
      const { x, y } = storeData.position;
      this.setPosition(x, y);
    }
  }

  public getStoreData(): IWorldObjectStoreData {
    const { position } = this;
    return {
      position: position
        ? {
            x: position.x,
            y: position.y,
          }
        : null,
    };
  }

  public applyStoreData() {}

  public getCollider() {
    return this.collider;
  }
}
