import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { removeGameObject, toggleCardOpenedGameObject } from '../worldGameObjects/worldGameObjects';

interface IGameObjectOnEditState {
  id: EntityId | null;
  isOnMove: boolean;
}

const initialState: IGameObjectOnEditState = {
  id: null,
  isOnMove: false,
};

const gameObjectOnEdit = createSlice({
  name: 'gameObjectOnEdit',
  initialState,
  reducers: {
    setEditedObject: (state, action: PayloadAction<EntityId | null>) => {
      state.id = action.payload;
    },

    setIsOnMove: (state, action: PayloadAction<boolean>) => {
      state.isOnMove = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(removeGameObject, (state, action) => {
      if (state.id === action.payload) {
        return initialState;
      }
    });

    builder.addCase(toggleCardOpenedGameObject, (state, action) => {
      const id = action.payload;
      if (state.id === id) {
        return initialState;
      }
    });
  },
});

export const { setEditedObject, setIsOnMove } = gameObjectOnEdit.actions;

export const selectEditedObjectId = (state: RootState) => state.gameObjectOnEdit.id;
export const selectEditedObjectIsOnMove = (state: RootState) => state.gameObjectOnEdit.isOnMove;

export default gameObjectOnEdit.reducer;
