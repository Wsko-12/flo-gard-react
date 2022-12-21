import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  IGameEntityStoreData,
  IWorldObjectStoreData,
} from '../../../game/world/objects/new/interfaces';
import { RootState } from '../../store';

const gameEntitiesAdapter = createEntityAdapter<IGameEntityStoreData>({
  selectId: (gameEntity) => gameEntity.id,
});

interface IGameEntitiesAdditionalState {
  cardOpened: EntityId[];
}

const gameEntities = createSlice({
  name: 'gameEntities',
  initialState: gameEntitiesAdapter.getInitialState<IGameEntitiesAdditionalState>({
    cardOpened: [],
  }),
  reducers: {
    addGameEntity: (state, action: PayloadAction<IGameEntityStoreData>) => {
      gameEntitiesAdapter.addOne(state, action.payload);
    },

    removeGameEntity: (state, action: PayloadAction<EntityId>) => {
      gameEntitiesAdapter.removeOne(state, action.payload);
    },

    updateGameEntity: (state, action: PayloadAction<IGameEntityStoreData>) => {
      const { id } = action.payload;
      gameEntitiesAdapter.updateOne(state, { id, changes: action.payload });
    },

    placeInWorldGameEntity: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      gameEntitiesAdapter.updateOne(state, { id, changes: { inInventory: false } });
    },

    placeInInventoryGameEntity: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      gameEntitiesAdapter.updateOne(state, { id, changes: { inInventory: true } });
      if (state.cardOpened.includes(id)) {
        state.cardOpened = state.cardOpened.filter((entityId) => entityId !== id);
      }
    },

    updateEntityWorldData: (
      state,
      action: PayloadAction<{ id: EntityId; world: IWorldObjectStoreData }>
    ) => {
      const { id, world } = action.payload;
      gameEntitiesAdapter.updateOne(state, { id, changes: { world } });
    },

    toggleEntityCardOpened: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      const index = state.cardOpened.indexOf(id);
      if (index === -1) {
        state.cardOpened.push(id);
      } else {
        state.cardOpened.splice(index, 1);
      }
    },
  },
});

export default gameEntities.reducer;

export const {
  addGameEntity,
  removeGameEntity,
  updateGameEntity,
  toggleEntityCardOpened,
  updateEntityWorldData,
  placeInWorldGameEntity,
  placeInInventoryGameEntity,
} = gameEntities.actions;

const adapterSelectors = gameEntitiesAdapter.getSelectors((state: RootState) => state.gameEntities);

export const selectInventoryEntitiesIds = createSelector(adapterSelectors.selectAll, (entities) => {
  return entities.filter((entity) => entity.inInventory).map((entity) => entity.id);
});

export const selectInventoryEntityDataById = (id: EntityId) => (state: RootState) =>
  adapterSelectors.selectById(state, id)?.inventory;

export const selectEntityDataById = (id: EntityId) => (state: RootState) =>
  adapterSelectors.selectById(state, id);

export const selectEntitiesIds = adapterSelectors.selectIds;

export const selectWorldEntityDataById = (id: EntityId) => (state: RootState) =>
  adapterSelectors.selectById(state, id)?.world;

export const selectOpenedEntitiesCard = (state: RootState) => state.gameEntities.cardOpened;
