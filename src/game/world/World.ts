import { Scene } from 'three';
import Day from './day/Day';
import Environment from './environment/Environment';
import { HitBoxScene } from './HitBoxScene';
import { Pot } from './objects/pots/Pot';

export default class World {
    static scene: Scene | null = null;
    static init() {
        const scene = new Scene();
        this.scene = scene;

        HitBoxScene.init();
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
