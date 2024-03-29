import { Scene } from "three";
import { QuadCollider } from "../entities/base/IndependentGameEntity/Collider/QuadCollider/QuadCollider";
import { GreenHouse_1 } from "../entities/entities/greenhouses/types/GreenHouse_1";
import { PotGround } from "../entities/entities/pots/PotGround";
import { Pot_1 } from "../entities/entities/pots/types/Pot_1";
import { Pallet_1 } from "../entities/entities/stands/types/Pallet_1";
import { Day } from "./day/Day";
import { Environment } from "./environment/Environment";

class World {
  static scene: Scene | null = null;
  static collider = new QuadCollider([
    [-5, 5],
    [5, 5],
    [5, -5],
    [-5, -5],
  ]);

  static init() {
    const scene = new Scene();
    this.scene = scene;

    Day.init();
    Environment.init();
    this.collider.add();

    new Pot_1();
    new PotGround();
    new Pallet_1();
    new GreenHouse_1();
    new GreenHouse_1();
  }

  static getScene() {
    if (!this.scene) {
      throw new Error("[World getScene] scene undefined");
    }

    return this.scene;
  }
}

export { World };
