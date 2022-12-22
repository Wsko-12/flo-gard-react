import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import {
  IIndependentEntityState,
  IndependentGameEntity,
} from '../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity';
import { EntityManager } from '../../../../game/entities/EntityManager';
import {
  selectEntityById,
  selectEntityOnMove,
} from '../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../store/store';
import DraggableCard from './DraggableCard/DraggableCard';
import EntityMoveBar from './EntityMoveBar/EntityMoveBar';

interface IEntityCardProps {
  id: EntityId;
}

const EntityCard = memo<IEntityCardProps>(({ id }) => {
  const entityState = useAppSelector(selectEntityById(id)) as IIndependentEntityState;
  const entityInstance = EntityManager.getEntityById(id);
  const onMove = useAppSelector(selectEntityOnMove);

  if (!entityState || !entityInstance || !(entityInstance instanceof IndependentGameEntity)) {
    return null;
  }

  const entityOnMove = onMove === id;

  return (
    <>
      <DraggableCard closeCb={() => entityInstance.closeCard()} visible={!entityOnMove}>
        <p>{entityState.id}</p>
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

export default EntityCard;
