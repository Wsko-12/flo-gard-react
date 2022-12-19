import { BufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { ClickHitBoxScene } from "../../ClickHitBoxScene";
import World from "../../World";

export class ClickHitBox {
    protected static material = new MeshBasicMaterial({visible: false, color: 0xFF0000, wireframe: true, wireframeLinewidth: 3});

    private mesh: Mesh;
    private onClick: () => void = () => {};
    constructor(geometry: BufferGeometry, onClick?: () => void){
        this.mesh = new Mesh(geometry, ClickHitBox.material);


        if(onClick){
            this.onClick = onClick;
        }

        this.add();
    }

    click(){
        this.onClick();
    }

    public setPosition(x: number, y: number){
        this.mesh.position.set(x, 0, y);
    }

    add() {
        ClickHitBoxScene.add(this);
        World.getScene().add(this.mesh);
    }

    remove() {
        ClickHitBoxScene.remove(this);
        World.getScene().remove(this.mesh);
    }

    getMesh() {
        return this.mesh;
    }
}