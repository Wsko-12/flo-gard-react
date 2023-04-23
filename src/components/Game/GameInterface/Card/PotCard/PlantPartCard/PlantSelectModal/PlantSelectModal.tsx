import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { EGameEntityTypes } from "../../../../../../../game/entities/base/GameEntity/GameEntity";
import { selectEntitiesIdsByType } from "../../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { useAppSelector } from "../../../../../../../store/store";
import { Modal } from "../../../../../../Modal/Modal";
import { PlantSelectItem } from "./PlantSelectItem";

interface IPlantSelectModalProps {
  close: () => void;
  select: (Plant: EntityId) => void;
}

const PlantSelectModal = memo<IPlantSelectModalProps>(({ close, select }) => {
  const ids = useAppSelector(selectEntitiesIdsByType(EGameEntityTypes.plant));

  return (
    <Modal close={close}>
      {ids.map((id) => (
        <PlantSelectItem key={id} id={id} select={select} />
      ))}
    </Modal>
  );
});
PlantSelectModal.displayName = "PlantSelectModal";

export { PlantSelectModal };
