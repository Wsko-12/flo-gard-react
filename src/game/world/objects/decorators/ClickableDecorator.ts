import { BufferGeometry } from "three";
import { ClickHitBox } from "../abstracts/ClickHitBox";

export class ClickableDecorator {
    private hitBox: ClickHitBox;
    constructor(geometry: BufferGeometry, onClick: () => void) {
        this.hitBox = new ClickHitBox(geometry, onClick);
    }


    public setPosition(x: number, y: number){
        this.hitBox.setPosition(x, y);
    }
    remove(){
        this.hitBox.remove();
    }
}