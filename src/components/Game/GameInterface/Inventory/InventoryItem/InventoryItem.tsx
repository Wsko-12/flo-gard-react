import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { selectEntityById } from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../../store/store';

interface IInventoryItemProps {
  id: EntityId;
}
const InventoryItem = memo<IInventoryItemProps>(({ id }) => {
  const entity = useAppSelector(selectEntityById(id));

  if (!entity || !entity.inInventory) {
    return null;
  }

  console.log(entity);
  return <div></div>;
});

export default InventoryItem;
