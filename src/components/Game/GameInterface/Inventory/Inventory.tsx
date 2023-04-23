import { memo } from "react";
import { selectEntitiesIds } from "../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { useAppSelector } from "../../../../store/store";
import { InventoryItem } from "./InventoryItem/InventoryItem";

const Inventory = memo(() => {
  const ids = useAppSelector(selectEntitiesIds);

  return (
    <div>
      {ids.map((id) => (
        <InventoryItem key={id} id={id} />
      ))}
    </div>
  );
});
Inventory.displayName = "Inventory";

export { Inventory };
