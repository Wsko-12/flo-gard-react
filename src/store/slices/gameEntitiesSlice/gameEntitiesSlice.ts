import { createEntityAdapter, createSlice, EntityId, EntityState } from '@reduxjs/toolkit';
import { IEntityState } from '../../../game/entities/base/GameEntity/GameEntity';

const gameEntitiesAdapter = createEntityAdapter<IEntityState>({
  selectId: (entity) => entity.id,
});

interface IGameEntitiesState {
  entities: EntityState<IEntityState>;
  cardOpened: EntityId[];
}

const initialState: IGameEntitiesState = {
  entities: gameEntitiesAdapter.getInitialState(),
  cardOpened: [],
};

const gameEntitiesSlice = createSlice({
  name: 'gameEntities',
  initialState,
  reducers: {},
});

export default gameEntitiesSlice.reducer;
