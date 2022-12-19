import { Mesh, MeshBasicMaterial } from "three";
import Assets from "../../../../assets/Assets";
import { GameObject } from "../abstracts/GameObject";
import { CircleCollider } from "../colliders/circleCollider/CircleCollider";

export class Pot extends GameObject {
    mesh: Mesh;
    collider = new CircleCollider(this.position, 0.15);
    
    materials = {
        stock: new MeshBasicMaterial(),
        blocked: new MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.5}),
    }
    constructor(){
        super();
        const geometry = Assets.getGeometry('pot_1');
        this.mesh = new Mesh(geometry, );
        this.applyDecorators();
    }

    onClick = () => {
        super.onClick();
    }

    public setBlockMaterial = (flag: boolean) => {
        if(flag){
            if(this.mesh.material !== this.materials.blocked){
                this.mesh.material = this.materials.blocked;
            }
        }else{
            if(this.mesh.material !== this.materials.stock){
                this.mesh.material = this.materials.stock;
            }
        }
    }
}