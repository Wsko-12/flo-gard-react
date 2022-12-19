import { Point2 } from "../../../environment/utils/Geometry";
import World from "../../../World";
import { Collider } from "../Collider";

export class CircleCollider extends Collider {
    position = new Point2(0, 0);
    r: number;
    constructor(position: Point2, radius: number) {
        super();
        this.position = position;
        this.r = radius;
    }
    isCollision() {
        let collision = false;
        World.getGameObjects().forEach(({ getCollider }) => {
            const collider = getCollider();
            if(collider !== this){
                if(collider instanceof CircleCollider){
                    if(this.checkCircleCollider(collider)){
                        collision = true;
                    };
                };
            }

        });

        return collision;
    }

    checkCircleCollider(collider: CircleCollider){
        const distance = this.position.getDistanceTo(collider.position);
        return distance < this.r + collider.r;
    }
}