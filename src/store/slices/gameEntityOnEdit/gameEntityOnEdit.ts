import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { placeInWorldGameEntity } from '../gameEntitiesSlice/gameEntitiesSlice';

export interface IGameEntityOnEditState {
  onMove: {
    id: EntityId | null;
    isCollision: boolean;
  };
}

const initialState: IGameEntityOnEditState = {
  onMove: {
    id: null,
    isCollision: false,
  },
};

const gameEntityOnEdit = createSlice({
  name: 'gameEntityOnEdit',
  initialState,
  reducers: {
    setEntityOnMove: (state, action: PayloadAction<EntityId | null>) => {
      const id = action.payload;
      if (!id) {
        state.onMove = initialState.onMove;
      } else {
        state.onMove.id = id;
      }
    },

    setEntityOnMoveCollision: (state, action: PayloadAction<boolean>) => {
      state.onMove.isCollision = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(placeInWorldGameEntity, (state, action) => {
      state.onMove.id = action.payload;
      state.onMove.isCollision = false;
    });
  },
});

export const { setEntityOnMove, setEntityOnMoveCollision } = gameEntityOnEdit.actions;

export default gameEntityOnEdit.reducer;

export const selectEntityOnMove = (state: RootState) => state.gameEntityOnEdit.onMove.id;
export const selectEntityOnMoveIsCollision = (state: RootState) =>
  state.gameEntityOnEdit.onMove.isCollision;
