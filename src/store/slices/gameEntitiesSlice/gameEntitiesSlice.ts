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

    updateEntity: (state, action: PayloadAction<IEntityState>) => {
      const { id } = action.payload;
      const update = {
        id,
        changes: action.payload,
      };
      gameEntitiesAdapter.updateOne(state.entities, update);
    },

    toggleCardOpened: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      const index = state.cardOpened.indexOf(id);

      if (index === -1) {
        state.cardOpened.push(id);
      } else {
        state.cardOpened.splice(index, 1);
      }
    },

    openEntityCard: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      if (!state.cardOpened.includes(id)) {
        state.cardOpened.push(id);
      }
    },

    closeEntityCard: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      const index = state.cardOpened.indexOf(id);
      if (index !== -1) {
        state.cardOpened.splice(index, 1);
      }
    },
  },
});

export default gameEntitiesSlice.reducer;

export const { addGameEntity, updateEntity, toggleCardOpened, openEntityCard, closeEntityCard } =
  gameEntitiesSlice.actions;
const entityAdapterSelectors = gameEntitiesAdapter.getSelectors(
  (state: RootState) => state.gameEntities.entities
);
export const selectEntitiesIds = entityAdapterSelectors.selectIds;
export const selectEntityById = (id: EntityId) => (state: RootState) =>
  entityAdapterSelectors.selectById(state, id);

export const selectOpenedCardsIds = (state: RootState) => state.gameEntities.cardOpened;
