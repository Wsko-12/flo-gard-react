import { GameStore } from "../../../gameStore/GameStore";
import LoopsManager from "../../../loopsManager/LoopsManager";
import { Point2 } from "../../environment/utils/Geometry";
import { GameObject } from "../abstracts/GameObject";

export class MovableDecorator {
    protected isMoving: boolean = false;
    position: Point2;
    gameObject: GameObject;
    constructor(position: Point2, gameObject: GameObject){
        this.position = position;
        this.gameObject = gameObject;
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
        this.gameObject.setPosition(this.position.x, this.position.y);
    }

    remove() {
        LoopsManager.unsubscribe('update', this.move);
    }
}