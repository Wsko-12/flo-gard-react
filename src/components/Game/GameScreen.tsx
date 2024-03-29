import { memo } from "react";
import { selectGameProcess } from "../../store/slices/gameSlice/gameSelectors";
import { EGameStatuses } from "../../store/slices/gameSlice/gameSlice";
import { useAppSelector } from "../../store/store";
import { AssetsLoadingScreen } from "./AssetsLoadingScreen/AssetsLoadingScreen";
import { GameCanvas } from "./GameCanvas/GameCanvas";
import { GameInterface } from "./GameInterface/GameInterface";

const GameScreen = memo(() => {
  const gameStatus = useAppSelector(selectGameProcess);

  if (gameStatus === EGameStatuses.assetsLoading) {
    return <AssetsLoadingScreen />;
  }

  if (gameStatus === EGameStatuses.started) {
    return (
      <>
        <GameCanvas />
        <GameInterface />
      </>
    );
  }

  return null;
});
GameScreen.displayName = "GameScreen";

export { GameScreen };
