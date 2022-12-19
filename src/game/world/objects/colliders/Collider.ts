import { Point2 } from "../../environment/utils/Geometry";

export abstract class Collider {
    abstract position: Point2;
    abstract isCollision(): boolean;
}