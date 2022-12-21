import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { EntityManager } from '../../../game/world/objects/EntityManager';
import { selectEntityDataById } from '../../../store/slices/new/gameEntities';
import { useAppSelector } from '../../../store/store';

interface IInventoryItemProps {
  id: EntityId;
}
const InventoryItem = memo<IInventoryItemProps>(({ id }) => {
  const item = useAppSelector(selectEntityDataById(id));

  if (!item) {
    return null;
  }

  if (!item.inInventory) {
    return null;
  }

  const inventoryData = item.inventory;

  const placeInWorld = () => {
    EntityManager.placeEntityToWorld(id);
  };

  return (
    <div>
      <p>{inventoryData.title}</p>
      {inventoryData.static ? null : <button onClick={placeInWorld}>Place in World</button>}
    </div>
  );
});

export default InventoryItem;
