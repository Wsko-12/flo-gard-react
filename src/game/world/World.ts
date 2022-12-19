import { EntityId } from '@reduxjs/toolkit';
import { Scene } from 'three';
import Day from './day/Day';
import Environment from './environment/Environment';
import { GameObject } from './objects/abstracts/GameObject';
import { Pot } from './objects/pots/Pot';

export default class World {
    static scene: Scene | null = null;
    private static  gameObjects: GameObject[] = [];
    static init() {
        const scene = new Scene();
        this.scene = scene;

        Day.init();
        Environment.init();

        const pot1 = new Pot();
        pot1.setPosition(0.5, 0);

        setTimeout(() => {
            pot1.addToWorld();
            setTimeout(() => {
                pot1.removeFromWorld();
                setTimeout(() => {
                    pot1.addToWorld();
                }, 5000)
            }, 5000)
        }, 5000)

    }

    static getScene() {
        if (!this.scene) {
            throw new Error('[World getScene] scene undefined');
        }
        return this.scene;
    }

    static addGameObject(gameObject: GameObject) {
        if(!this.scene){
            throw new Error('[World addGameObject] scene undefined')
        }

        if(this.gameObjects.includes(gameObject)){
            return;
        }

        this.gameObjects.push(gameObject);

        const mesh = gameObject.getMesh();
        this.scene.add(mesh);
    }

    static removeGameObject(gameObject: GameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        if(index === -1){
            console.warn(`[World removeGameObject] Object ${gameObject.id} isn't added to scene`);
            return;
        }
        this.gameObjects.splice(index, 1);

        if(!this.scene){
            throw new Error('[World removeGameObject] scene undefined')
        }

        this.scene.remove(gameObject.getMesh());
    }

    static removeGameObjectById(id: EntityId) {
        const gameObject = this.gameObjects.find(object => object.id === id);
        if(!gameObject){
            console.warn(`[World removeGameObjectById] Object ${id} isn't added to scene`);
            return;
        }
        gameObject.removeFromWorld();
    }

    static getGameObjects() {
        return this.gameObjects;
    }
}
