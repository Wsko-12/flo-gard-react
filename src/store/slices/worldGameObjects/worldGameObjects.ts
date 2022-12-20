import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface IGameObjectWorldData {
  id: string;
  position: {
    x: number;
    y: number;
  } | null;
}
const worldGameObjectsAdapter = createEntityAdapter<IGameObjectWorldData>({
  selectId: (object) => object.id,
});

export interface IGameObjectsAdditionalState {
  cardOpened: EntityId[];
}

const worldGameObjects = createSlice({
  name: 'worldGameObject',
  initialState: worldGameObjectsAdapter.getInitialState<IGameObjectsAdditionalState>({
    cardOpened: [],
  }),
  reducers: {
    addGameObject: (state, action: PayloadAction<IGameObjectWorldData>) => {
      worldGameObjectsAdapter.addOne(state, action.payload);
    },

    removeGameObject: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      worldGameObjectsAdapter.removeOne(state, id);
      if (state.cardOpened.includes(id)) {
        const index = state.cardOpened.indexOf(id);
        state.cardOpened.splice(index, 1);
      }
    },

    toggleCardOpenedGameObject: (state, action: PayloadAction<EntityId>) => {
      const objectId = action.payload;

      const isCardOpened = state.cardOpened.includes(objectId);

      if (isCardOpened) {
        const newCardOpened = state.cardOpened.filter((cardId) => cardId != objectId);
        state.cardOpened = newCardOpened;
      } else {
        state.cardOpened.push(objectId);
      }
    },

    updateGameObject: (state, action: PayloadAction<IGameObjectWorldData>) => {
      const { id } = action.payload;
      worldGameObjectsAdapter.updateOne(state, { id, changes: action.payload });
    },
  },
});

export const { addGameObject, toggleCardOpenedGameObject, removeGameObject, updateGameObject } =
  worldGameObjects.actions;

export default worldGameObjects.reducer;

const adapterSelectors = worldGameObjectsAdapter.getSelectors<RootState>(
  (state) => state.worldGameObjects
);

export const selectOpenedObjectCardsIds = (state: RootState) => state.worldGameObjects.cardOpened;
export const selectGameObjectById = (id: EntityId) => (state: RootState) =>
  adapterSelectors.selectById(state, id);
