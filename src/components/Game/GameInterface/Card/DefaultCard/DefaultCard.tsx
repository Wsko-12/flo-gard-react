import { memo } from "react";
import { IEntityState } from "../../../../../game/entities/base/GameEntity/GameEntity";
import { IndependentGameEntity } from "../../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity";
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

const DefaultCard = memo<IEntityCardProps>(({ id }) => {
  const entityState = useAppSelector(selectEntityById(id)) as IEntityState;
  const entityInstance = EntityManager.getEntityById(id);
  const onMove = useAppSelector(selectEntityOnMove);
  const menuBind = useEntityCardMenu(id);

  if (!entityState || !entityInstance || !(entityInstance instanceof IndependentGameEntity)) {
    return null;
  }

  const entityOnMove = onMove === id;

  return (
    <>
      <DraggableCard closeCb={() => entityInstance.closeCard()} visible={!entityOnMove}>
        <EntityCardMenu {...menuBind} />
      </DraggableCard>
      {entityOnMove && <EntityMoveBar id={id} />}
    </>
  );
});
DefaultCard.displayName = "DefaultCard";

export { DefaultCard };
