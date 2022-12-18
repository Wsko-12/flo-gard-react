import { Object3D, Raycaster, Scene } from "three";
import GameCamera from "../renderer/gameCamera/GameCamera";
import { HitBox } from "./objects/abstracts/HitBox";

export class HitBoxScene {
    private static scene: Scene | null = null;
    private static raycaster = new Raycaster();
    private static hitBoxes: HitBox[] = [];
    static init() {
        this.scene = new Scene();
    }

    static click(clientX: number, clientY: number){
        if(!this.scene){
            throw new Error('[HitBoxScene click] scene undefined');
        }

        const x = (clientX / window.innerWidth ) * 2 - 1;
        const y = - (clientY / window.innerHeight ) * 2 + 1;

        const { raycaster } = this;
        raycaster.setFromCamera({x, y}, GameCamera.getCamera());
        const intersects = raycaster.intersectObjects( this.scene.children );
        if(intersects[0]){
            this.callHitBoxClick(intersects[0].object);
        }
    }

    static callHitBoxClick(mesh: Object3D) {
        const hitBox = this.hitBoxes.find(hitBox => hitBox.getMesh() === mesh);
        if(hitBox){
            hitBox.click();
        }
    }

    static add(hitBox: HitBox){
        if(!this.scene){
            throw new Error('[HitBoxScene add] scene undefined')
        }

        const isAdded = this.hitBoxes.includes(hitBox);
        if(isAdded){
            return;
        }

        this.hitBoxes.push(hitBox);
        this.scene.add(hitBox.getMesh());
    }

    static remove(hitBox: HitBox){
        if(!this.scene){
            throw new Error('[HitBoxScene remove] scene undefined')
        }

        const index = this.hitBoxes.indexOf(hitBox);
        if(index === -1){
            return;
        }

        this.hitBoxes.splice(index, 1);
        this.scene.remove(hitBox.getMesh());
    }
}