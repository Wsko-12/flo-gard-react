import {
  createEntityAdapter,
  createSlice,
  EntityId,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
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
  reducers: {
    addGameEntity: (state, action: PayloadAction<IEntityState>) => {
      gameEntitiesAdapter.addOne(state.entities, action.payload);
    },
  },
});

export default gameEntitiesSlice.reducer;

export const { addGameEntity } = gameEntitiesSlice.actions;
