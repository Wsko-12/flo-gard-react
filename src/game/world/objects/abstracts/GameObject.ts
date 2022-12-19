import { BufferGeometry, Group, Mesh } from "three";
import { selectEditedObjectId, selectEditedObjectIsOnMove, setEditedObject, setIsOnMove } from "../../../../store/slices/gameObjectOnEdit/gameObjectOnEdit";
import { addGameObject, IGameObjectStoreData, removeGameObject, selectGameObjectById, toggleSelectGameObject, updateGameObject } from "../../../../store/slices/worldGameObjects/worldGameObjects";
import { store } from "../../../../store/store";
import { generateGameObjectId } from "../../../../utils/utils";
import Environment from "../../environment/Environment";
import { Point2 } from "../../environment/utils/Geometry";
import World from "../../World";
import { Collider } from "../colliders/Collider";
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
    protected abstract collider: Collider;
    public position: Point2;
    public id: string;
    public storeData: IGameObjectStoreData;
    protected abstract mesh: Mesh | Group;
    protected options: IGameObjectOptions;


    private movable: MovableDecorator | null = null;
    private clickable: ClickableDecorator | null = null;
    private storeUnsubscribe: () => void = () => {};

    constructor(options: IGameObjectOptions = defaultOptions){
        this.options = options;
        this.position = new Point2(0, 0)

        this.id = generateGameObjectId();
        this.storeData = {
            id: this.id,
            position: null,
            isSelected: false,
            isMovable: !!options.isMovable,
        }
    }

    private applyStoreUpdate = () => {
        const state = store.getState();
        const onEdit = selectEditedObjectId(state) === this.id;
        const data = selectGameObjectById(this.id)(state);
        if(!data){
            throw new Error(`[Object ${this.id} applyStoreData] don't saved in store`)
        };

        this.storeData.isSelected = data.isSelected;
        this.storeData.position = data.position;

        if(this.movable){
            const onMoveBefore = this.movable?.isMoving;
            const onMoveNow = onEdit && selectEditedObjectIsOnMove(state);
            this.movable?.setIsMoving(onMoveNow);

            const positionChanged = onMoveBefore && !onMoveNow;
            if(positionChanged){
                const isCollision = this.collider.isCollision();
                if(!isCollision){
                    this.savePosition();
                    this.setBlockMaterial(false);
                    Environment.updateObjectsOnGrass();
                    return;
                }

                const savedPosition = data.position;
                if(savedPosition){
                    this.setPosition(savedPosition.x, savedPosition.y);
                    this.setBlockMaterial(false);
                    Environment.updateObjectsOnGrass();
                }else{
                    this.removeFromWorld();
                }
            }
        }

    }

    protected savePosition() {
        const { position } = this;
        store.dispatch(updateGameObject({
            ...this.storeData,
            position: { x: position.x, y: position.y }
        }))
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
        store.dispatch(addGameObject({...this.storeData, position: null, isSelected: false}));
        if(openCard){
            this.onClick();
            if(this.movable){
                store.dispatch(setEditedObject(this.id));
                store.dispatch(setIsOnMove(true));
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

    public getCollider = () => {
        return this.collider;
    };

    public updateGrassHeight(ctx: CanvasRenderingContext2D, resolution: number){
        this.collider.updateGrassHeight(ctx, resolution, this.storeData.position);
    }

    public abstract  setBlockMaterial: (flag: boolean) => void;
}
