import { BufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { ClickHitBoxScene } from "../../ClickHitBoxScene";
import World from "../../World";

export class HitBox {
    protected static material = new MeshBasicMaterial({visible: false, color: 0xFF0000, wireframe: true, wireframeLinewidth: 3});

    private mesh: Mesh;
    private onClick: () => void = () => {};
    constructor(geometry: BufferGeometry, onClick?: () => void){
        this.mesh = new Mesh(geometry, HitBox.material);


        if(onClick){
            this.onClick = onClick;
        }

        ClickHitBoxScene.add(this);
        World.getScene().add(this.mesh);
    }

    click(){
        this.onClick();
    }

    public setPosition(x: number, y: number){
        this.mesh.position.set(x, 0, y);
    }

    remove() {
        ClickHitBoxScene.remove(this);
    }

    getMesh() {
        return this.mesh;
    }
}