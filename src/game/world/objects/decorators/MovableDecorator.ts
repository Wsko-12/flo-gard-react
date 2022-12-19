import { GameStore } from "../../../gameStore/GameStore";
import LoopsManager from "../../../loopsManager/LoopsManager";
import { Point2 } from "../../environment/utils/Geometry";
import { GameObject } from "../abstracts/GameObject";

export class MovableDecorator {
    public isMoving: boolean = false;
    position: Point2;
    
    gameObject: GameObject;
    constructor(gameObject: GameObject){
        this.position = gameObject.position.current;
        this.gameObject = gameObject; 
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

    checkCollision = () => true;
    add(){
        LoopsManager.subscribe('update', this.move);
    }
    remove() {
        LoopsManager.unsubscribe('update', this.move);
    }
}