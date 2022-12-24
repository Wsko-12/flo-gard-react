import { EntityId } from '@reduxjs/toolkit';
import { Group, Mesh } from 'three';
import { EGameEntityTypes, IEntityAddsState } from '../../base/GameEntity/GameEntity';
import {
  IIndependentEntityState,
  IndependentGameEntity,
} from '../../base/IndependentGameEntity/IndependentGameEntity';
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
    this.groundMesh.visible = false;
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

  public getAddsState(): IPotAddsState {
    const groundId = this.ground?.id || null;
    return {
      groundId,
    };
  }
}
