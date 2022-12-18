import { Group, Mesh } from "three";
import { Point2 } from "../../environment/utils/Geometry";
import World from "../../World";

export abstract class GameObject {

    protected position: Point2;
    protected abstract mesh: Mesh | Group;
    constructor(x = 0, y = 0){
        this.position = new Point2(x, y);
    }

    public add() {
        World.getScene().add(this.mesh);
    }

    public remove() {
        World.getScene().remove(this.mesh);
    }
}