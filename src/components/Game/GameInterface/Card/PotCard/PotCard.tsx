import React, { memo } from 'react';
import { IPotState, Pot } from '../../../../../game/entities/entities/pots/Pot';
import { EntityManager } from '../../../../../game/entities/EntityManager';
import {
  selectEntityById,
  selectEntityOnMove,
} from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../../store/store';
import DraggableCard from '../DraggableCard/DraggableCard';
import { IEntityCardProps } from '../EntityCard';
import EntityMoveBar from '../EntityMoveBar/EntityMoveBar';

const PotCard = memo<IEntityCardProps>(({ id }) => {
  const entityState = useAppSelector(selectEntityById(id)) as IPotState;
  const entityInstance = EntityManager.getEntityById(id);
  const onMove = useAppSelector(selectEntityOnMove);

  if (!entityState || !entityInstance || !(entityInstance instanceof Pot)) {
    return null;
  }

  const entityOnMove = onMove === id;
  return (
    <>
      <DraggableCard closeCb={() => entityInstance.closeCard()} visible={!entityOnMove}>
        <button onClick={() => entityInstance.placeInInventory()}>
          <span className="material-symbols-outlined">inventory_2</span>
        </button>
        <button onClick={() => entityInstance.setIsOnMove(true)}>
          <span className="material-symbols-outlined">open_with</span>
        </button>
      </DraggableCard>
      {entityOnMove && <EntityMoveBar id={id} />}
    </>
  );
});

export default PotCard;
