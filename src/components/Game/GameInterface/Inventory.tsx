import React, { memo } from 'react';
import { selectEntityOnMove } from '../../../store/slices/gameEntityOnEdit/gameEntityOnEdit';
import { selectEntitiesIds } from '../../../store/slices/new/gameEntities';
import { useAppSelector } from '../../../store/store';
import InventoryItem from './InventoryItem';

const Inventory = memo(() => {
  const ids = useAppSelector(selectEntitiesIds);
  const entityOnMove = useAppSelector(selectEntityOnMove);

  if (entityOnMove) {
    return null;
  }

  return (
    <div style={{ position: 'fixed' }}>
      {ids.map((id) => (
        <InventoryItem key={id} id={id} />
      ))}
    </div>
  );
});

export default Inventory;
