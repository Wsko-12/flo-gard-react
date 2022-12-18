import { Mesh, MeshBasicMaterial } from "three";
import Assets from "../../../../assets/Assets";
import World from "../../World";
import { ClickableObject } from "../abstracts/ClickableObject";
import { MovableObject } from "../abstracts/MovableObject";

export class Pot extends MovableObject {
    mesh: Mesh;
    clickableObject: ClickableObject;
    constructor(){
        super();
        const geometry = Assets.getGeometry('pot_1');
        this.mesh = new Mesh(Assets.getGeometry('pot_1'), new MeshBasicMaterial());
        this.clickableObject = new ClickableObject(geometry, () => {
            this.setIsMoving(true);
        });

        World.getScene().add(this.mesh);
    }

    remove(): void {
        super.remove()
        this.clickableObject.remove();
    }
}