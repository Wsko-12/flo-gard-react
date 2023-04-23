import { EntityId } from "@reduxjs/toolkit";
import { BufferGeometry, Group, Mesh, MeshPhongMaterial } from "three";
import { EGameEntityTypes, IEntityAddsState } from "../../base/GameEntity/GameEntity";
import {
  IIndependentEntityState,
  IndependentGameEntity,
} from "../../base/IndependentGameEntity/IndependentGameEntity";
import { EntityManager } from "../../EntityManager";
import { getPotGroundColorByWet, PotGround } from "./PotGround";
import { Plant } from "../plant/Plant";
import { IPosition3 } from "../../../../ts/interfaces";

interface IPotAddsState extends IEntityAddsState {
  groundId: EntityId | null;
  plantId: EntityId | null;
}

interface IPotState extends IIndependentEntityState {
  adds: IPotAddsState;
}

enum EPotSizes {
  XS,
  S,
  M,
  L,
}

abstract class Pot extends IndependentGameEntity {
  type = EGameEntityTypes.pot;
  public mesh = new Group();
  abstract groundMesh: Mesh<BufferGeometry, MeshPhongMaterial>;
  abstract size: EPotSizes;
  abstract plantPoint: IPosition3;
  ground: PotGround | null = null;
  plant: Plant | null = null;

  public placeInWorld(): void {
    this.setGround(null);
    this.setPlant(null);
    this.updateGroundMesh();
    super.placeInWorld();
  }

  public placeInInventory(): void {
    this.setGround(null);
    this.setPlant(null);
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
      this.setPlant(null);
    }
    this.updateGroundMesh();
    this.storeManager.updateState();
  }

  public setPlant(plantId: EntityId | null) {
    if (plantId) {
      const plant = EntityManager.getEntityById(plantId);
      if (!plant || !plant.inInventory || !(plant instanceof Plant)) {
        return;
      }

      this.plant = plant;
      plant.placeInWorld();
      const plantMesh = this.plant.getMesh();
      plantMesh.position.set(this.plantPoint.x, this.plantPoint.y, this.plantPoint.z);
      this.mesh.add(plantMesh);
    } else {
      if (this.plant) {
        this.plant.remove();
        const plantMesh = this.plant.getMesh();

        this.mesh.remove(plantMesh);
      }

      this.plant = null;
    }
    // this.updateGroundMesh();
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
      const { water } = this.ground.state;
      this.groundMesh.material.color.set(getPotGroundColorByWet(water));
    }
  }

  public getAddsState(): IPotAddsState {
    const groundId = this.ground?.id || null;
    const plantId = this.plant?.id || null;

    return {
      groundId,
      plantId,
    };
  }
}

export type { IPotState };

export { Pot, EPotSizes };
