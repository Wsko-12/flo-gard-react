import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IGameObjectStoreData {
    id: string;
    placed: {
        x: number,
        y: number
    } | null,
    isSelected: boolean;
    isMovable: boolean;
}
const worldGameObjectsAdapter = createEntityAdapter<IGameObjectStoreData>({
    selectId: object => object.id,
})

export interface IGameObjectsAdditionalState {
    selected: EntityId[]
    onMove: {
        object: EntityId | null,
        isCanPlaced: boolean,
    };
}

const worldGameObjects = createSlice({
    name: 'worldGameObject',
    initialState: worldGameObjectsAdapter.getInitialState<IGameObjectsAdditionalState>({
        selected: [],
        onMove: {
            object: null,
            isCanPlaced: false,
        },
    }),
    reducers: {
        addGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            worldGameObjectsAdapter.addOne(state, action.payload);
        },

        removeGameObject: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            worldGameObjectsAdapter.removeOne(state, id);
            if(state.selected.includes(id)){
                const index = state.selected.indexOf(id);
                state.selected.splice(index, 1);
                if(state.onMove.object === id){
                    state.onMove.object = null;
                }
            };

        },

        toggleSelectGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            const {id, isSelected} = action.payload
            worldGameObjectsAdapter.setOne(state, action.payload);

            if(isSelected){
                state.selected.push(id);
            }else{
                const index = state.selected.indexOf(id);
                state.selected.splice(index, 1);
                if(state.onMove.object === id){
                    state.onMove.object = null;
                }
            }
        },

        setOnMoveObject: (state, action: PayloadAction<EntityId | null>) => {
            state.onMove.object = action.payload;
        }
    },


});

export const { addGameObject, toggleSelectGameObject, setOnMoveObject, removeGameObject } = worldGameObjects.actions;


export default worldGameObjects.reducer;

const adapterSelectors = worldGameObjectsAdapter.getSelectors<RootState>((state) => state.worldGameObjects);

export const selectSelectedObjectsIds = (state: RootState) => state.worldGameObjects.selected;
export const selectGameObjectById = (id: EntityId) => (state: RootState) => adapterSelectors.selectById(state, id)
export const selectGameObjectOnMove = (state: RootState) => state.worldGameObjects.onMove.object;