import { Mesh, MeshBasicMaterial } from "three";
import Assets from "../../../../assets/Assets";
import { GameObject } from "../abstracts/GameObject";

export class Pot extends GameObject {
    mesh: Mesh;
    constructor(){
        super();
        const geometry = Assets.getGeometry('pot_1');
        this.mesh = new Mesh(geometry, new MeshBasicMaterial());
        this.applyDecorators();
    }

    onClick = () => {
        super.onClick();
    }
}