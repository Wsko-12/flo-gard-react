import React, { memo } from 'react';
import { selectEntitiesIds } from '../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../store/store';
import styles from './inventory.module.scss';
import InventoryItem from './InventoryItem/InventoryItem';
const Inventory = memo(() => {
  const ids = useAppSelector(selectEntitiesIds);
  return (
    <div>
      {ids.map((id) => (
        <InventoryItem key={id} id={id} />
      ))}
    </div>
  );
});

export default Inventory;
