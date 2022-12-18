import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IGameObjectStoreData {
    id: string;
    isSelected: boolean;
    isMovable: boolean;
}
const gameObjectsAdapter = createEntityAdapter<IGameObjectStoreData>({
    selectId: object => object.id,
})

export interface IGameObjectsAdditionalState {
    selected: EntityId[]
    onMove: EntityId | null;
}

const gameObjects = createSlice({
    name: 'selectedGameObject',
    initialState: gameObjectsAdapter.getInitialState<IGameObjectsAdditionalState>({
        selected: [],
        onMove: null,
    }),
    reducers: {
        addGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            gameObjectsAdapter.addOne(state, action.payload);
        },

        toggleSelectGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            const {id, isSelected} = action.payload
            gameObjectsAdapter.setOne(state, action.payload);

            if(isSelected){
                state.selected.push(id);
            }else{
                const index = state.selected.indexOf(id);
                state.selected.splice(index, 1);
            }
        },

        setOnMoveObject: (state, action: PayloadAction<EntityId | null>) => {
            state.onMove = action.payload;
        }
    },


});

export const { addGameObject, toggleSelectGameObject, setOnMoveObject } = gameObjects.actions;


export default gameObjects.reducer;

const adapterSelectors = gameObjectsAdapter.getSelectors<RootState>((state) => state.gameObjects);

export const selectSelectedObjectsIds = (state: RootState) => state.gameObjects.selected;
export const selectGameObjectById = (id: EntityId) => (state: RootState) => adapterSelectors.selectById(state, id)
export const selectGameObjectOnMove = (state: RootState) => state.gameObjects.onMove;
