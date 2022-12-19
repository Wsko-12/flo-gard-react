import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import gameInterfaceSettings from "./slices/gameInterfaceSettings/gameInterfaceSettings";
import gameSlice from "./slices/gameSlice/gameSlice";
import worldGameObjects from "./slices/worldGameObject/worldGameObject";

export const store = configureStore({
    reducer: {
        game: gameSlice,
        gameInterfaceSetting: gameInterfaceSettings,
        worldGameObjects: worldGameObjects,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;