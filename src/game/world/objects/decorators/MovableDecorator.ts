import { Group, Mesh } from "three";
import { GameStore } from "../../../gameStore/GameStore";
import LoopsManager from "../../../loopsManager/LoopsManager";
import { Point2 } from "../../environment/utils/Geometry";

export class MovableDecorator {
    protected isMoving: boolean = false;
    position: Point2;
    mesh: Mesh | Group;
    constructor(position: Point2, mesh: Mesh | Group){
        this.position = position;
        this.mesh = mesh;
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
    }
}