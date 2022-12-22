import { Scene } from 'three';
import { Pot } from '../entities/entities/Pot';
import Day from './day/Day';
import Environment from './environment/Environment';

export default class World {
  static scene: Scene | null = null;
  static init() {
    const scene = new Scene();
    this.scene = scene;

    Day.init();
    Environment.init();

    new Pot();
  }

  static getScene() {
    if (!this.scene) {
      throw new Error('[World getScene] scene undefined');
    }
    return this.scene;
  }
}
