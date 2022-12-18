import { RootState } from "../../store";

export const selectGameProcess = (state: RootState) => state.game.process;
export const selectAssetsLoadingStatus = (state: RootState) => state.game.assetsLoadingStatus;
export const selectGrassMoverEnabled = (state: RootState) => state.game.environment.grass.moverEnabled;