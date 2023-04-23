import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { gameEntitiesSliceReducer } from "./slices/gameEntitiesSlice/gameEntitiesSlice";
import { gameInterfaceSettingsSliceReducer } from "./slices/gameInterfaceSettings/gameInterfaceSettings";
import { gameSliceReducer } from "./slices/gameSlice/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameSliceReducer,
    gameInterfaceSetting: gameInterfaceSettingsSliceReducer,
    gameEntities: gameEntitiesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
