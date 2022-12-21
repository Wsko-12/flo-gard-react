import { EntityId } from '@reduxjs/toolkit';
import { Mesh, MeshPhongMaterial } from 'three';
import Assets from '../../../../../../assets/Assets';
import { toggleEntityCardOpened } from '../../../../../../store/slices/new/gameEntities';
import { store } from '../../../../../../store/store';
import { CircleCollider } from '../../worldObject/colliders/circleCollider/CircleCollider';
import { WorldObject } from '../../worldObject/WorldObject';

export class PotWorld extends WorldObject {
  clickBoxGeometry = Assets.getGeometry('pot_1');
  mesh = new Mesh(Assets.getGeometry('pot_1'), new MeshPhongMaterial());

  constructor(id: EntityId) {
    super(id);
    this.collider = new CircleCollider(0.15);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.applyDecorators();
  }

  placeInWorld() {
    super.placeInWorld();
    store.dispatch(toggleEntityCardOpened(this.id));
  }

  protected onClick = () => {
    if (this.moveDecorator?.isMoving) {
      return;
    }
    store.dispatch(toggleEntityCardOpened(this.id!));
  };
}
