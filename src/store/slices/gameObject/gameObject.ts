import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IGameObjectStoreData {
    id: string;
    isSelected: boolean;
}
const gameObjectsAdapter = createEntityAdapter<IGameObjectStoreData>({
    selectId: object => object.id,
})

const gameObjects = createSlice({
    name: 'selectedGameObject',
    initialState: gameObjectsAdapter.getInitialState<{selected: EntityId[]}>({
        selected: []
    }),
    reducers: {
        addGameObject: (state, action: PayloadAction<IGameObjectStoreData>) => {
            gameObjectsAdapter.addOne(state, action.payload);
        },

        toggleSelectGameObject: (state, action: PayloadAction<{id: string, isSelected: boolean}>) => {
            const {id, isSelected} = action.payload
            gameObjectsAdapter.updateOne(state, {
                id,
                changes: {
                    isSelected,
                }
            });

            if(isSelected){
                state.selected.push(id);
            }else{
                const index = state.selected.indexOf(id);
                state.selected.splice(index, 1);
            }
        }
    },


});

export const { addGameObject, toggleSelectGameObject } = gameObjects.actions;


export default gameObjects.reducer;

const adapterSelectors = gameObjectsAdapter.getSelectors<RootState>((state) => state.gameObjects);

export const selectSelectedObjectsIds = (state: RootState) => state.gameObjects.selected;
export const selectGameObjectById = (id: EntityId) => (state: RootState) => adapterSelectors.selectById(state, id)