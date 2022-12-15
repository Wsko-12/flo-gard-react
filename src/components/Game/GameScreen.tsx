import { memo } from "react";
import { selectGameProcess } from "../../store/slices/gameSlice/gameSelectors";
import { EGameStatuses } from "../../store/slices/gameSlice/gameSlice";
import { useAppSelector } from "../../store/store";
import { AssetsLoadingScreen } from "./AssetsLoadingScreen/AssetsLoadingScreen";

export const GameScreen = memo(() => {
    const gameStatus = useAppSelector(selectGameProcess);

    if(gameStatus === EGameStatuses.assetsLoading){
        return <AssetsLoadingScreen />
    }
    return null;
})