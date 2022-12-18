import { GameStore } from "../../../gameStore/GameStore";
import LoopsManager from "../../../loopsManager/LoopsManager";
import { GameObject } from "./GameObject";

export abstract class MovableObject extends GameObject {
    protected isMoving: boolean = false;
    constructor(x = 0, y = 0){
        super(x, y);

        LoopsManager.subscribe('update', this.move)
    }

    setIsMoving(flag: boolean){
        this.isMoving = flag;
    }

    move = () => {
        if(!this.isMoving){
            return;
        }
        const {x, z} = GameStore.cameraTarget;
        this.position.x = x;
        this.position.y = z;
        this.mesh.position.set(this.position.x, 0, this.position.y);
    }

    remove() {
        LoopsManager.unsubscribe('update', this.move);
        super.remove();
    }
}