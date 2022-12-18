import { BufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { HitBoxScene } from "../../HitBoxScene";

export class HitBox {
    protected static material = new MeshBasicMaterial();

    private mesh: Mesh;
    private onClick: () => void = () => {};
    constructor(geometry: BufferGeometry, onClick?: () => void){
        this.mesh = new Mesh(geometry, HitBox.material);


        if(onClick){
            this.onClick = onClick;
        }

        HitBoxScene.add(this);
    }

    click(){
        this.onClick();
    }

    remove() {
        HitBoxScene.remove(this);
    }

    getMesh() {
        return this.mesh;
    }
}