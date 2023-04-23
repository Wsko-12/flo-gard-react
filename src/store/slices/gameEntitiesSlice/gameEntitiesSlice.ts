import {
  createEntityAdapter,
  createSlice,
  EntityId,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { EGameEntityTypes, IEntityState } from "../../../game/entities/base/GameEntity/GameEntity";
import { RootState } from "../../store";

interface IGameEntitiesState {
  entities: EntityState<IEntityState>;
  cardOpened: EntityId[];
  onMove: EntityId | null;
}

const gameEntitiesAdapter = createEntityAdapter<IEntityState>({
  selectId: (entity) => entity.id,
});

const initialState: IGameEntitiesState = {
  entities: gameEntitiesAdapter.getInitialState(),
  cardOpened: [],
  onMove: null,
};

const gameEntitiesSlice = createSlice({
  name: "gameEntities",
  initialState,
  reducers: {
    addGameEntity: (state, action: PayloadAction<IEntityState>) => {
      gameEntitiesAdapter.addOne(state.entities, action.payload);
    },

    removeGameEntity: (state, action: PayloadAction<EntityId>) => {
      gameEntitiesAdapter.removeOne(state.entities, action.payload);
    },

    updateEntity: (state, action: PayloadAction<IEntityState>) => {
      const { id } = action.payload;
      const update = {
        id,
        changes: action.payload,
      };
      gameEntitiesAdapter.updateOne(state.entities, update);
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

    closeAllEntityCards: (state) => {
      state.cardOpened.length = 0;
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

    setEntityOnMove: (state, action: PayloadAction<EntityId>) => {
      state.onMove = action.payload;
    },

    deleteEntityOnMove: (state, action: PayloadAction<EntityId>) => {
      if (state.onMove === action.payload) {
        state.onMove = null;
      }
    },
  },
});

const gameEntitiesSliceReducer = gameEntitiesSlice.reducer;

const entityAdapterSelectors = gameEntitiesAdapter.getSelectors(
  (state: RootState) => state.gameEntities.entities
);

const selectEntitiesIds = entityAdapterSelectors.selectIds;

const selectEntityById = (id: EntityId | null) => (state: RootState) =>
  id ? entityAdapterSelectors.selectById(state, id) : undefined;

const selectOpenedCardsIds = (state: RootState) => state.gameEntities.cardOpened;

const selectEntityOnMove = (state: RootState) => state.gameEntities.onMove;

const selectEntitiesIdsByType = (type: EGameEntityTypes) => (state: RootState) =>
  entityAdapterSelectors
    .selectAll(state)
    .filter((entity) => entity.type === type)
    .map((entity) => entity.id);

export const {
  addGameEntity,
  updateEntity,
  toggleEntityCardOpened,
  openEntityCard,
  closeEntityCard,
  setEntityOnMove,
  deleteEntityOnMove,
  removeGameEntity,
  closeAllEntityCards,
} = gameEntitiesSlice.actions;

export {
  gameEntitiesSliceReducer,
  selectEntitiesIds,
  selectEntityById,
  selectOpenedCardsIds,
  selectEntityOnMove,
  selectEntitiesIdsByType,
};
