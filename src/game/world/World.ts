import { Scene } from 'three';
import { Cube } from '../entities/entities/Cube';
import { Pot_1 } from '../entities/entities/pots/types/Pot_1';
import { Sphere } from '../entities/entities/Sphere';
import Day from './day/Day';
import Environment from './environment/Environment';

export default class World {
  static scene: Scene | null = null;
  static init() {
    const scene = new Scene();
    this.scene = scene;

    Day.init();
    Environment.init();

    new Sphere();
    new Cube();
    new Pot_1();
  }

  static getScene() {
    if (!this.scene) {
      throw new Error('[World getScene] scene undefined');
    }
    return this.scene;
  }
}
