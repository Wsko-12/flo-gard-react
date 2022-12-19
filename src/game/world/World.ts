import { Scene } from 'three';
import Day from './day/Day';
import Environment from './environment/Environment';
import { Pot } from './objects/pots/Pot';

export default class World {
    static scene: Scene | null = null;
    static init() {
        const scene = new Scene();
        this.scene = scene;

        Day.init();
        Environment.init();

        const pot1 = new Pot();
        pot1.setPosition(0.5, 0);

        const pot2 = new Pot();
        pot2.setPosition(-0.5, 0);

        const pot3 = new Pot();
        pot3.setPosition(0, 0.5);

        const pot4 = new Pot();
        pot4.setPosition(0, -0.5);

    }

    static getScene() {
        if (!this.scene) {
            throw new Error('[World getScene] scene undefined');
        }
        return this.scene;
    }
}
