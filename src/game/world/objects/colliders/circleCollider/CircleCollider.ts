import { GROUND_SIZE } from "../../../environment/ground/Ground";
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

    updateGrassHeight(ctx: CanvasRenderingContext2D, resolution: number, position: {x: number, y: number} | null): void {
        if(!position){
            return;
        }
        const {x, y} = position;
        const r = this.r * 3;
        const canvas_x = ((x + GROUND_SIZE / 2) / (GROUND_SIZE / 2)) * (resolution / 2);
        const canvas_y = ((y + GROUND_SIZE / 2) / (GROUND_SIZE / 2)) * (resolution / 2);
        const radius = (r / (GROUND_SIZE * 1.5)) * resolution;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(canvas_x, canvas_y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}