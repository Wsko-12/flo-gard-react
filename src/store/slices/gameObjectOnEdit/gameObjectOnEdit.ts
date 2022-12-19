import { createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeGameObject, toggleSelectGameObject } from "../worldGameObjects/worldGameObjects";


interface IGameObjectOnEditState {
    id: EntityId | null;
    isOnMove: boolean;
}

const initialState: IGameObjectOnEditState = {
    id: null,
    isOnMove: false,
}

const gameObjectOnEdit = createSlice({
    name: 'gameObjectOnEdit',
    initialState,
    reducers: {
        setEditedObject: (state, action: PayloadAction<EntityId | null>) => {
            if(!action.payload){
                return initialState;
            }else{
                state.id = action.payload;
                return state;
            }
        },

        setIsOnMove: (state, action: PayloadAction<boolean>) => {
            state.isOnMove = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(removeGameObject, (state, action) => {
            if(state.id === action.payload){
                return initialState
            }
        });

        builder.addCase(toggleSelectGameObject, (state, action) => {
            if(state.id === action.payload.id){
                return initialState
            }
        });
        
    },
});

export const { setEditedObject, setIsOnMove } = gameObjectOnEdit.actions;

export const selectEditedObject = (state: RootState) => state.gameObjectOnEdit.id;
export const selectEditedObjectIsOnMove = (state: RootState) => state.gameObjectOnEdit.isOnMove;

export default gameObjectOnEdit.reducer;