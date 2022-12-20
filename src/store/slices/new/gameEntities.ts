import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { IGameEntityStoreData } from '../../../game/world/objects/new/interfaces';

const gameEntitiesAdapter = createEntityAdapter<IGameEntityStoreData>({
  selectId: (gameEntity) => gameEntity.id,
});

const gameEntities = createSlice({
  name: 'gameEntities',
  initialState: gameEntitiesAdapter.getInitialState(),
  reducers: {
    addGameEntity: (state, action: PayloadAction<IGameEntityStoreData>) => {
      gameEntitiesAdapter.addOne(state, action.payload);
    },

    removeGameEntity: (state, action: PayloadAction<EntityId>) => {
      gameEntitiesAdapter.removeOne(state, action.payload);
    },
  },
});

export default gameEntities.reducer;
