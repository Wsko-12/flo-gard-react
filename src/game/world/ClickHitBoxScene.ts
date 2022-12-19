import { Mesh, Object3D, Raycaster } from "three";
import GameCamera from "../renderer/gameCamera/GameCamera";
import { ClickHitBox } from "./objects/abstracts/HitBox";

export class ClickHitBoxScene {
    private static raycaster = new Raycaster();
    private static hitBoxes: ClickHitBox[] = [];
    private static hitBoxesMeshArray: Mesh[] = [];

    static click(clientX: number, clientY: number){

        const x = (clientX / window.innerWidth ) * 2 - 1;
        const y = - (clientY / window.innerHeight ) * 2 + 1;

        const { raycaster } = this;
        raycaster.setFromCamera({x, y}, GameCamera.getCamera());
        const intersects = raycaster.intersectObjects( this.hitBoxesMeshArray);
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

    static add(hitBox: ClickHitBox){

        const isAdded = this.hitBoxes.includes(hitBox);
        if(isAdded){
            return;
        }

        this.hitBoxes.push(hitBox);
        this.hitBoxesMeshArray.push(hitBox.getMesh());
    }

    static remove(hitBox: ClickHitBox){

        {
            const index = this.hitBoxes.indexOf(hitBox);
            if(index === -1){
                return;
            }
            this.hitBoxes.splice(index, 1);

        }

        {
            const index = this.hitBoxesMeshArray.indexOf(hitBox.getMesh());
            if(index === -1){
                return;
            }
            this.hitBoxesMeshArray.splice(index, 1);
        }
    }
}