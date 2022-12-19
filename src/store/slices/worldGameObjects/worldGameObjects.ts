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
    cardOpened: EntityId[]
}

const worldGameObjects = createSlice({
    name: 'worldGameObject',
    initialState: worldGameObjectsAdapter.getInitialState<IGameObjectsAdditionalState>({
        cardOpened: [],
    }),
    reducers: {
        addGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            worldGameObjectsAdapter.addOne(state, action.payload);
        },

        removeGameObject: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            worldGameObjectsAdapter.removeOne(state, id);
            if(state.cardOpened.includes(id)){
                const index = state.cardOpened.indexOf(id);
                state.cardOpened.splice(index, 1);
            };
        },

        toggleSelectGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            const {id, isSelected} = action.payload
            worldGameObjectsAdapter.setOne(state, action.payload);

            if(isSelected){
                state.cardOpened.push(id);
            }else{
                const index = state.cardOpened.indexOf(id);
                state.cardOpened.splice(index, 1);
            }
        },

        updateGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            const {id, isSelected} = action.payload
            worldGameObjectsAdapter.setOne(state, action.payload);

            if(isSelected){
                state.cardOpened.push(id);
            }else{
                const index = state.cardOpened.indexOf(id);
                state.cardOpened.splice(index, 1);
            }
        },
    },


});

export const { addGameObject, toggleSelectGameObject, removeGameObject } = worldGameObjects.actions;


export default worldGameObjects.reducer;

const adapterSelectors = worldGameObjectsAdapter.getSelectors<RootState>((state) => state.worldGameObjects);

export const selectOpenedObjectCardsIds = (state: RootState) => state.worldGameObjects.cardOpened;
export const selectGameObjectById = (id: EntityId) => (state: RootState) => adapterSelectors.selectById(state, id)