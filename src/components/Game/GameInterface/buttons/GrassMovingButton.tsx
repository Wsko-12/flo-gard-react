import { memo } from "react";
import { selectGrassMoverEnabled } from "../../../../store/slices/gameSlice/gameSelectors";
import { setGrassMoverEnabled } from "../../../../store/slices/gameSlice/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

const GrassMovingButton = memo(() => {
  const enabled = useAppSelector(selectGrassMoverEnabled);
  const dispatch = useAppDispatch();

  return null;

  return (
    <button
      onClick={() => dispatch(setGrassMoverEnabled(!enabled))}
      style={{ backgroundColor: enabled ? "red" : "white" }}
    >
      Grass
    </button>
  );
});
GrassMovingButton.displayName = "GrassMovingButton";

export { GrassMovingButton };
