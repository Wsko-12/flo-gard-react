import {
  createEntityAdapter,
  createSlice,
  EntityId,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IEntityState } from '../../../game/entities/base/GameEntity/GameEntity';
import { RootState } from '../../store';

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
const entityAdapterSelectors = gameEntitiesAdapter.getSelectors(
  (state: RootState) => state.gameEntities.entities
);
export const selectEntitiesIds = entityAdapterSelectors.selectIds;
export const selectEntityById = (id: EntityId) => (state: RootState) =>
  entityAdapterSelectors.selectById(state, id);
