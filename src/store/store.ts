import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import gameEntitiesSlice from './slices/gameEntitiesSlice/gameEntitiesSlice';
import gameInterfaceSettings from './slices/gameInterfaceSettings/gameInterfaceSettings';
import gameSlice from './slices/gameSlice/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
    gameInterfaceSetting: gameInterfaceSettings,
    gameEntities: gameEntitiesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
