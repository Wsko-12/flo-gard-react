import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import gameEntityOnEdit from './slices/gameEntityOnEdit/gameEntityOnEdit';
import gameInterfaceSettings from './slices/gameInterfaceSettings/gameInterfaceSettings';
import gameSlice from './slices/gameSlice/gameSlice';
import gameEntities from './slices/gameEntitiesSlice/gameEntitiesSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
    gameInterfaceSetting: gameInterfaceSettings,
    gameEntityOnEdit: gameEntityOnEdit,
    gameEntities: gameEntities,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
