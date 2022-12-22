import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { IndependentGameEntity } from '../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity';
import { EntityManager } from '../../../../game/entities/EntityManager';
import { selectEntityById } from '../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../store/store';
import DraggableCard from './DraggableCard/DraggableCard';

interface IEntityCardProps {
  id: EntityId;
}
const EntityCard = memo<IEntityCardProps>(({ id }) => {
  const entityState = useAppSelector(selectEntityById(id));
  const entityInstance = EntityManager.getEntityById(id);

  if (!entityState || !entityInstance || !(entityInstance instanceof IndependentGameEntity)) {
    return null;
  }

  return (
    <DraggableCard closeCb={() => entityInstance.openCard()}>
      <p>{entityState.id}</p>
    </DraggableCard>
  );
});

export default EntityCard;
