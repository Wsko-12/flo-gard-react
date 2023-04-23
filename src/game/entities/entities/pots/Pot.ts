import { EntityId } from "@reduxjs/toolkit";
import { BufferGeometry, Group, Mesh, MeshPhongMaterial } from "three";
import { EGameEntityTypes, IEntityAddsState } from "../../base/GameEntity/GameEntity";
import {
  IIndependentEntityState,
  IndependentGameEntity,
} from "../../base/IndependentGameEntity/IndependentGameEntity";
import { EntityManager } from "../../EntityManager";
import { getPotGroundColorByWet, PotGround } from "./PotGround";

export interface IPotAddsState extends IEntityAddsState {
  groundId: EntityId | null;
}

export interface IPotState extends IIndependentEntityState {
  adds: IPotAddsState;
}

export abstract class Pot extends IndependentGameEntity {
  type = EGameEntityTypes.pot;
  public mesh = new Group();
  abstract groundMesh: Mesh<BufferGeometry, MeshPhongMaterial>;
  ground: PotGround | null = null;
  constructor() {
    super();
  }

  public placeInWorld(): void {
    this.setGround(null);
    this.updateGroundMesh();
    super.placeInWorld();
  }

  public placeInInventory(): void {
    this.setGround(null);
    this.updateGroundMesh();
    super.placeInInventory();
  }

  public init(): void {
    const { groundMesh } = this;
    groundMesh.castShadow = true;
    groundMesh.receiveShadow = true;
    groundMesh.userData.type = "Ground";

    this.mesh.add(groundMesh);
    super.init();
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

  public pourGround() {
    if (!this.ground) {
      return;
    }
    this.ground.pour();
    this.updateGroundMesh();
  }
  private updateGroundMesh() {
    this.groundMesh.visible = !!this.ground;
    if (this.ground) {
      const { wet } = this.ground.state;
      this.groundMesh.material.color.set(getPotGroundColorByWet(wet));
    }
  }

  public getAddsState(): IPotAddsState {
    const groundId = this.ground?.id || null;

    return {
      groundId,
    };
  }
}
