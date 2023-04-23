import { EntityId } from "@reduxjs/toolkit";
import { memo, useState } from "react";
import { Pot } from "../../../../../../game/entities/entities/pots/Pot";
import { EntityManager } from "../../../../../../game/entities/EntityManager";
import { PlantSelectModal } from "./PlantSelectModal/PlantSelectModal";
import { useAppSelector } from "../../../../../../store/store";
import { selectEntityById } from "../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { IPlantState } from "../../../../../../game/entities/entities/plant/Plant";

interface IGroundPartCardProps {
  potId: EntityId;
  groundId: EntityId | null;
  plantId: EntityId | null;
}

const PlantPartCard = memo<IGroundPartCardProps>(({ groundId, potId, plantId }) => {
  const potInstance = EntityManager.getEntityById(potId);
  const plantState = useAppSelector(selectEntityById(plantId)) as IPlantState;
  const [isPlantSelect, setIsPlantSelect] = useState(false);

  // if no ground we can't select plant
  if (!groundId) {
    return null;
  }

  if (!potInstance || !(potInstance instanceof Pot)) {
    return null;
  }

  if (!plantId) {
    return isPlantSelect ? (
      <PlantSelectModal
        close={() => setIsPlantSelect(false)}
        select={(plantId) => {
          potInstance.setPlant(plantId);
          setIsPlantSelect(false);
        }}
      />
    ) : (
      <button onClick={() => setIsPlantSelect(true)}>Plant</button>
    );
  }

  return <div>{plantState.inventoryData.title}</div>;
});
PlantPartCard.displayName = "PlantPartCard";

export { PlantPartCard };
