import { Mesh, MeshBasicMaterial } from "three";
import Assets from "../../../../assets/Assets";
import World from "../../World";
import { GameObject } from "../abstracts/GameObject";

export class Pot extends GameObject {
    mesh: Mesh;
    constructor(){
        super();
        const geometry = Assets.getGeometry('pot_1');
        this.mesh = new Mesh(geometry, new MeshBasicMaterial());
        World.getScene().add(this.mesh);
        
        this.applyDecorators();
    }

    remove(): void {
        super.remove()
    }

    onClick = () => {
        super.onClick();
    }
}