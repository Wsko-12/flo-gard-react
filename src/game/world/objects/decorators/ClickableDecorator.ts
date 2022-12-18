import { BufferGeometry } from "three";
import { HitBoxScene } from "../../HitBoxScene";
import { HitBox } from "../abstracts/HitBox";

export class ClickableDecorator {
    private hitBox: HitBox;
    constructor(geometry: BufferGeometry, onClick: () => void) {
        this.hitBox = new HitBox(geometry, onClick);
        HitBoxScene.add(this.hitBox);
    }

    remove(){
        this.hitBox.remove();
    }
}