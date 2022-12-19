import { BufferGeometry, Group, Mesh } from "three";
import { addGameObject, IGameObjectStoreData, removeGameObject, selectGameObjectById, selectGameObjectOnMove, setOnMoveObject, toggleSelectGameObject } from "../../../../store/slices/worldGameObjects/worldGameObjects";
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

    public position: {
        current: Point2;
        placed: Point2 | null;
    };
    public id: string;
    public storeData: IGameObjectStoreData;
    protected abstract mesh: Mesh | Group;
    protected options: IGameObjectOptions;


    private movable: MovableDecorator | null = null;
    private clickable: ClickableDecorator | null = null;
    private storeUnsubscribe: () => void = () => {};

    constructor(options: IGameObjectOptions = defaultOptions){
        this.options = options;
        this.position = {
            current: new Point2(0, 0),
            placed: null,
        }

        this.id = generateGameObjectId();
        this.storeData = {
            id: this.id,
            placed: null,
            isSelected: false,
            isMovable: !!options.isMovable,
        }
    }

    private applyStoreUpdate = () => {
        const state = store.getState();
        const data = selectGameObjectById(this.id)(state);
        if(!data){
            throw new Error(`[Object ${this.id} applyStoreData] don't saved in store`)
        };

        this.storeData.isSelected = data.isSelected;

        if(this.movable){
            const onMoveBefore = this.movable?.isMoving;
            const onMoveNow = selectGameObjectOnMove(state) === this.id;
            this.movable?.setIsMoving(onMoveNow);

            // check flag when object in bad position
            if(onMoveBefore && !onMoveNow){
                
                const isCollision = this.movable.checkCollision();
                if(!isCollision){
                    this.setPlaced(this.position.current);
                }

                // if have position before
                if(this.position.placed){
                    const {x, y} = this.position.placed;
                    this.setPosition(x, y);
                    return;
                }

                // if don't have position before 
                if(!this.position.placed){
                    this.removeFromWorld();
                    return;
                }
            }
        }

    }

    public setPlaced({x, y}: Point2) {
        store.dispatch(toggleSelectGameObject({
            ...this.storeData,
            placed: {x, y},
        }));
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

    public addToWorld(openCard: boolean = false) {
        this.setPosition(0, 0);
        this.storeUnsubscribe = store.subscribe(this.applyStoreUpdate);
        World.addGameObject(this);
        this.movable?.add();
        this.clickable?.add();
        store.dispatch(addGameObject({...this.storeData}));
        if(openCard){
            this.onClick();
            if(this.movable){
                store.dispatch(setOnMoveObject(this.id));
            }
        }
    }

    public setPosition(x: number, y: number){
        this.mesh.position.set(x, 0, y);
        if(this.clickable){
            this.clickable.setPosition(x, y);
        }
    }

    public removeFromWorld() {
        this.storeUnsubscribe();
        this.storeUnsubscribe = () => {};
        World.removeGameObject(this);
        this.movable?.remove();
        this.clickable?.remove();
        this.storeData.isSelected = false;
        store.dispatch(removeGameObject(this.id));
    }

    public getMesh() {
        return this.mesh;
    }

    public onClick(){
        const isSelected = !this.storeData.isSelected
        store.dispatch(toggleSelectGameObject({
            ...this.storeData,
            isSelected,
        }))
    }
}