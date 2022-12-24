import { Scene } from 'three';
import { Cube } from '../entities/entities/Cube';
import { Pot } from '../entities/entities/pots/Pot';
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
    new Pot();
  }

  static getScene() {
    if (!this.scene) {
      throw new Error('[World getScene] scene undefined');
    }
    return this.scene;
  }
}
