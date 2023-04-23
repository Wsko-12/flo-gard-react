import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { selectEntityById } from "../../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { useAppSelector } from "../../../../../../../store/store";

interface IPlantSelectItemProps {
  id: EntityId;
  select: (id: EntityId) => void;
}

const PlantSelectItem = memo<IPlantSelectItemProps>(({ id, select }) => {
  const entityState = useAppSelector(selectEntityById(id));

  if (!entityState || !entityState.inInventory) {
    return null;
  }

  return (
    <div>
      {entityState.inventoryData.title}
      <button onClick={() => select(id)}>Select</button>
    </div>
  );
});
PlantSelectItem.displayName = "PlantSelectItem";

export { PlantSelectItem };
