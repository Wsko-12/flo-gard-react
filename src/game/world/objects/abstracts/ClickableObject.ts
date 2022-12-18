import { BufferGeometry } from "three";
import { HitBoxScene } from "../../HitBoxScene";
import { HitBox } from "./HitBox";

export class ClickableObject {
    private hitBox: HitBox;
    constructor(geometry: BufferGeometry, onClick: () => void) {
        this.hitBox = new HitBox(geometry, onClick);
        HitBoxScene.add(this.hitBox);
    }

    remove(){
        this.hitBox.remove();
    }
}