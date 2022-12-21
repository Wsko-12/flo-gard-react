import { EntityId } from '@reduxjs/toolkit';
import { BufferGeometry, Group, Mesh } from 'three';
import {
  selectEntityOnMove,
  setEntityOnMoveCollision,
} from '../../../../../store/slices/gameEntityOnEdit/gameEntityOnEdit';
import { store } from '../../../../../store/store';
import { Point2 } from '../../../environment/utils/Geometry';
import World from '../../../World';
import { MoveDecorator } from '../decorators/MoveDecorator';
import { EntityManager } from '../EntityManager';

import { IWorldObjectStoreData } from '../interfaces';
import { ClickBox } from './clickBoxes/ClickBox';
import { Collider } from './colliders/Collider';

export abstract class WorldObject {
  protected collider: Collider | null = null;
  public position: Point2 | null = null;
  protected mesh: Mesh | Group | null = null;
  protected meshPosition = new Point2(0, 0);
  protected clickBoxGeometry: BufferGeometry | null = null;
  protected id: EntityId;
  protected collision = false;

  protected moveDecorator: MoveDecorator | null = null;
  protected clickBox: ClickBox | null = null;
  constructor(id: EntityId) {
    this.id = id;
  }

  public setEntityId(id: EntityId) {
    this.id = id;
  }

  public getMesh() {
    return this.mesh;
  }

  public setMeshPosition(x: number, y: number) {
    if (!this.mesh) {
      return;
    }

    this.meshPosition.set(x, y);
    this.mesh.position.set(x, 0, y);
    this.clickBox?.setMeshPosition(x, y);
    this.collider?.setPosition(x, y);
  }
  public getMeshPosition() {
    return this.meshPosition;
  }
  protected applyDecorators() {
    if (this.clickBoxGeometry) {
      this.clickBox = new ClickBox(this.clickBoxGeometry, this.onClick);
      this.moveDecorator = new MoveDecorator(this);
    }
  }

  public setPosition(x: number, y: number) {
    this.setMeshPosition(x, y);
    this.position = new Point2(x, y);
  }

  public placeInWorld() {
    if (!this.mesh) {
      return;
    }
    this.setMeshPosition(0, 0);
    World.getScene().add(this.mesh);
    this.clickBox?.add();
    this.moveDecorator?.add();
    this.moveDecorator?.setIsMoving(true);
  }

  public placeInInventory() {
    if (!this.mesh) {
      return;
    }

    World.getScene().remove(this.mesh);
    this.clickBox?.remove();
    this.moveDecorator?.remove();
    this.moveDecorator?.setIsMoving(false);
    this.position = null;
  }

  public checkCollision() {
    const editedId = selectEntityOnMove(store.getState());
    if (editedId != this.id) {
      return;
    }

    const before = this.collision;
    const now = !!this.collider?.isCollision();
    this.collision = now;

    if (before !== now) {
      store.dispatch(setEntityOnMoveCollision(now));
    }
  }

  protected onClick = () => {};

  public getStoreData(): IWorldObjectStoreData {
    const { position } = this;
    const isMovable = !!this.moveDecorator;
    return {
      position: position
        ? {
            x: position.x,
            y: position.y,
          }
        : null,
      isMovable,
    };
  }

  public applyStoreData(data: IWorldObjectStoreData, isOnMove: boolean) {
    // apply moves
    if (this.moveDecorator) {
      const before = this.moveDecorator.isMoving;
      const now = isOnMove;

      if (before && !now) {
        const isCollision = !!this.collider?.isCollision();
        if (isCollision) {
          if (data.position) {
            const { x, y } = data.position;
            this.setPosition(x, y);
          } else {
            EntityManager.placeEntityToInventory(this.id);
          }
        }
      }
      this.moveDecorator.setIsMoving(isOnMove);
    }

    if (data.position) {
      const { x, y } = data.position;
      this.setPosition(x, y);
    }
  }

  public getCollider() {
    return this.collider;
  }
}
