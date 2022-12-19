import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import gameInterfaceSettings from "./slices/gameInterfaceSettings/gameInterfaceSettings";
import gameObjectOnEdit from "./slices/gameObjectOnEdit/gameObjectOnEdit";
import gameSlice from "./slices/gameSlice/gameSlice";
import worldGameObjects from "./slices/worldGameObjects/worldGameObjects";

export const store = configureStore({
    reducer: {
        game: gameSlice,
        gameInterfaceSetting: gameInterfaceSettings,
        worldGameObjects: worldGameObjects,
        gameObjectOnEdit: gameObjectOnEdit,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;