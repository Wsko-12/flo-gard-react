import { memo } from "react";
import { IPotState, Pot } from "../../../../../game/entities/entities/pots/Pot";
import { EntityManager } from "../../../../../game/entities/EntityManager";
import {
  selectEntityById,
  selectEntityOnMove,
} from "../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { useAppSelector } from "../../../../../store/store";
import { EntityCardMenu, useEntityCardMenu } from "../components/EntityCardMenu";
import { DraggableCard } from "../DraggableCard/DraggableCard";
import { IEntityCardProps } from "../EntityCard";
import { EntityMoveBar } from "../EntityMoveBar/EntityMoveBar";
import { GroundPartCard } from "./GroundPartCard/GroundPartCard";

const PotCard = memo<IEntityCardProps>(({ id }) => {
  const entityState = useAppSelector(selectEntityById(id)) as IPotState;
  const entityInstance = EntityManager.getEntityById(id);
  const onMove = useAppSelector(selectEntityOnMove);
  const menuBind = useEntityCardMenu(id);

  if (!entityState || !entityInstance || !(entityInstance instanceof Pot)) {
    return null;
  }

  const entityOnMove = onMove === id;

  return (
    <>
      <DraggableCard closeCb={() => entityInstance.closeCard()} visible={!entityOnMove}>
        <GroundPartCard groundId={entityState.adds.groundId} potId={id} />
        <EntityCardMenu {...menuBind} />
      </DraggableCard>
      {entityOnMove && <EntityMoveBar id={id} />}
    </>
  );
});
PotCard.displayName = "PotCard";

export { PotCard };
