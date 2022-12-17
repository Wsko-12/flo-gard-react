import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EAssetType } from "../../../assets/Assets";

export enum EGameStatuses {
    started = 'started',
    loading = 'loading',
    assetsLoading = 'assetsLoading',
    lobby = 'lobby',
}

interface IGameState {
    process: EGameStatuses,
    assetsLoadingStatus: {
        asset: EAssetType,
        progress: number,
    }
    environment: {
        grass: {
            moverEnabled: boolean,
        }
        dayTime: number,
    }

}

const initialState: IGameState = {
    process: EGameStatuses.lobby,
    assetsLoadingStatus: {
        asset: EAssetType.texture,
        progress: 0,
    },

    environment: {
        grass: {
            moverEnabled: false,
        },
        dayTime: 0,
    },
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameStatus: (state, action: PayloadAction<EGameStatuses>) => {
            state.process = action.payload;
        },

        setAssetsLoadingStatus: (state, action: PayloadAction<IGameState['assetsLoadingStatus']>) => {
            state.assetsLoadingStatus = action.payload;
        },

        setGrassMoverEnabled: (state, action: PayloadAction<boolean>) => {
            state.environment.grass.moverEnabled = action.payload;
        },

        setDayTime: (state, action: PayloadAction<number>) => {
            state.environment.dayTime = action.payload;
        }
    }
});

export default gameSlice.reducer;

export const {setGameStatus, setDayTime, setAssetsLoadingStatus, setGrassMoverEnabled} = gameSlice.actions;