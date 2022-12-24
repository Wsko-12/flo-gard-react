import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { EntityManager } from '../../../../../game/entities/EntityManager';
import { selectEntityById } from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../../store/store';

interface IInventoryItemProps {
  id: EntityId;
}
const InventoryItem = memo<IInventoryItemProps>(({ id }) => {
  const entityState = useAppSelector(selectEntityById(id));
  const entityInstance = EntityManager.getEntityById(id);

  if (!entityState || !entityState.inInventory || !entityInstance) {
    return null;
  }

  const data = entityState.inventoryData;

  return (
    <div>
      <p>{data.title}</p>
      {entityState.isIndependent && (
        <button onClick={() => entityInstance.placeInWorld()}>Place</button>
      )}
    </div>
  );
});

export default InventoryItem;
