import { createAsyncThunk } from "@reduxjs/toolkit";
import Assets, { TAssetsLoadingStatus } from "../../../assets/Assets";
import { EGameStatuses, setAssetsLoadingStatus, setGameStatus } from "./gameSlice";

export const startGame = createAsyncThunk('game/start', async (_, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(setGameStatus(EGameStatuses.assetsLoading));
    const loadingCb: TAssetsLoadingStatus = (asset, progress) => {
        dispatch(setAssetsLoadingStatus({asset, progress}))
    };
    await Assets.load(loadingCb);
});