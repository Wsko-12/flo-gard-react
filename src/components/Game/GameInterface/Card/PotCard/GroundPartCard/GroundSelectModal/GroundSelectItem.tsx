import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { IPotGroundState } from "../../../../../../../game/entities/entities/pots/PotGround";
import { selectEntityById } from "../../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { useAppSelector } from "../../../../../../../store/store";

interface IGroundSelectItemProps {
  id: EntityId;
  select: (id: EntityId) => void;
}

const GroundSelectItem = memo<IGroundSelectItemProps>(({ id, select }) => {
  const entityState = useAppSelector(selectEntityById(id)) as IPotGroundState;
  if (!entityState || !entityState.inInventory) {
    return null;
  }

  return (
    <div>
      {entityState.id}
      <button onClick={() => select(id)}>Select</button>
    </div>
  );
});
GroundSelectItem.displayName = "GroundSelectItem";

export { GroundSelectItem };
