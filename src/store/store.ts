import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import gameInterfaceSettings from "./slices/gameInterfaceSettings/gameInterfaceSettings";
import gameSlice from "./slices/gameSlice/gameSlice";
import gameObject from "./slices/gameObject/gameObject";

export const store = configureStore({
    reducer: {
        game: gameSlice,
        gameInterfaceSetting: gameInterfaceSettings,
        gameObjects: gameObject,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;