import { BufferGeometry, Group, Mesh } from "three";
import { addGameObject, IGameObjectStoreData, selectGameObjectById, selectGameObjectOnMove, toggleSelectGameObject } from "../../../../store/slices/gameObject/gameObject";
import { store } from "../../../../store/store";
import { generateGameObjectId } from "../../../../utils/utils";
import { Point2 } from "../../environment/utils/Geometry";
import World from "../../World";
import { ClickableDecorator } from "../decorators/ClickableDecorator";
import { MovableDecorator } from "../decorators/MovableDecorator";

interface IGameObjectOptions {
    isMovable?: boolean;
    isClickable?: boolean;
    hitBoxGeometry?: BufferGeometry;
}

const defaultOptions: IGameObjectOptions = {
    isMovable: true,
    isClickable: true,
}
export abstract class GameObject {

    public position: Point2;
    public id: string;
    public storeData: IGameObjectStoreData;
    protected abstract mesh: Mesh | Group;
    protected options: IGameObjectOptions;


    private movable: MovableDecorator | null = null;
    private clickable: ClickableDecorator | null = null;
    private storeUnsubscribe: () => void;

    constructor(options: IGameObjectOptions = defaultOptions){
        this.options = options;
        this.position = new Point2(0, 0);
        this.id = generateGameObjectId();
        this.storeData = {
            id: this.id,
            isSelected: false,
            isMovable: !!options.isMovable,
        }

        store.dispatch(addGameObject({...this.storeData}));
        this.storeUnsubscribe = store.subscribe(this.applyStoreUpdate);
    }

    private applyStoreUpdate = () => {
        const state = store.getState();
        const data = selectGameObjectById(this.id)(state);
        if(!data){
            throw new Error(`[Object ${this.id} applyStoreData] don't saved in store`)
        };

        this.storeData.isSelected = data.isSelected;

        const onMove = selectGameObjectOnMove(state) === this.id;
        this.movable?.setIsMoving(onMove);
    }

    protected applyDecorators() {
        const { isMovable, isClickable } = this.options;

        if(isMovable){
            this.movable = new MovableDecorator(this);
        }

        if(isClickable){
            let geometry: BufferGeometry;
            if(this.mesh instanceof Mesh){
                geometry = this.options.hitBoxGeometry || this.mesh.geometry;
            }else{
                if(!this.options.hitBoxGeometry){
                    throw new Error('[GameObject applyDecorators] if mesh is Group you have to provide hitBox geometry')
                }
                geometry = this.options.hitBoxGeometry
            }
            this.clickable = new ClickableDecorator(geometry, this.onClick);
        }
    }

    public add() {
        World.getScene().add(this.mesh);
    }

    public setPosition(x: number, y: number){
        this.mesh.position.set(x, 0, y);
        if(this.clickable){
            this.clickable.setPosition(x, y);
        }
    }

    public remove() {
        World.getScene().remove(this.mesh);
        this.movable?.remove();
        this.clickable?.remove();
        this.storeUnsubscribe();
    }

    public onClick(){
        const isSelected = !this.storeData.isSelected
        store.dispatch(toggleSelectGameObject({
            ...this.storeData,
            isSelected,
        }))
    }
}