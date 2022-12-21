import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IPosition2 } from '../../../ts/interfaces';
import { RootState } from '../../store';

export interface IWorldObjectStoreData {
  position: { x: number; y: number } | null;
  isMovable: boolean;
}

export interface IInventoryObjectStoreData {
  imageUrl: string;
  title: string;
  static: boolean;
}

export interface IGameEntityStoreData {
  id: EntityId;
  inInventory: boolean;
  world: IWorldObjectStoreData;
  inventory: IInventoryObjectStoreData;
}

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

    setEntityPosition: (
      state,
      action: PayloadAction<{ id: EntityId; position: IPosition2 | null }>
    ) => {
      const { id, position } = action.payload;

      const selectors = gameEntitiesAdapter.getSelectors();
      const entity = selectors.selectById(state, id);
      if (entity) {
        gameEntitiesAdapter.updateOne(state, {
          id,
          changes: {
            world: {
              ...entity.world,
              position: position ? { x: position.x, y: position.y } : null,
            },
          },
        });
      }
    },

    placeInWorldGameEntity: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      gameEntitiesAdapter.updateOne(state, { id, changes: { inInventory: false } });
    },

    placeInInventoryGameEntity: (state, action: PayloadAction<EntityId>) => {
      const id = action.payload;
      const selectors = gameEntitiesAdapter.getSelectors();
      const entity = selectors.selectById(state, id);
      if (entity) {
        gameEntitiesAdapter.updateOne(state, {
          id,
          changes: {
            inInventory: true,
            world: { ...entity.world, position: null },
          },
        });
      }
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
  setEntityPosition,
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
