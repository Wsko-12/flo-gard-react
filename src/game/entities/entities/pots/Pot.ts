import { EntityId } from '@reduxjs/toolkit';
import { Group, Mesh } from 'three';
import { EGameEntityTypes, IEntityAddsState } from '../../base/GameEntity/GameEntity';
import {
  IIndependentEntityState,
  IndependentGameEntity,
} from '../../base/IndependentGameEntity/IndependentGameEntity';
import { EntityManager } from '../../EntityManager';
import { PotGround } from './PotGround';

export interface IPotAddsState extends IEntityAddsState {
  groundId: EntityId | null;
}
export interface IPotState extends IIndependentEntityState {
  adds: IPotAddsState;
}

export abstract class Pot extends IndependentGameEntity {
  type = EGameEntityTypes.pot;
  abstract mesh: Group;
  abstract potMesh: Mesh;
  abstract groundMesh: Mesh;
  ground: PotGround | null = null;
  constructor() {
    super();
  }

  public placeInWorld(): void {
    super.placeInWorld();
    this.ground = null;
    this.updateGroundMesh();
  }

  public init(): void {
    const { groundMesh, potMesh } = this;
    groundMesh.castShadow = true;
    groundMesh.receiveShadow = true;
    potMesh.castShadow = true;
    potMesh.castShadow = true;

    this.mesh.add(groundMesh, potMesh);
    super.init();
  }

  private updateGroundMesh() {
    this.groundMesh.visible = !!this.ground;
  }
  public setGround(groundId: EntityId | null) {
    if (groundId) {
      const ground = EntityManager.getEntityById(groundId);
      if (!ground || !ground.inInventory || !(ground instanceof PotGround)) {
        return;
      }
      this.ground = ground;
      ground.placeInWorld();
    } else {
      if (this.ground) {
        this.ground.remove();
      }
      this.ground = null;
    }
    this.updateGroundMesh();
    this.storeManager.updateState();
  }

  public getAddsState(): IPotAddsState {
    const groundId = this.ground?.id || null;
    return {
      groundId,
    };
  }
}
