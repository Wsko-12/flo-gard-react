import React, { memo } from 'react';
import { selectEntityOnMove } from '../../../../../store/slices/gameEntityOnEdit/gameEntityOnEdit';
import { selectOpenedEntitiesCard } from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../../store/store';
import ObjectsCard from './ObjectCard/ObjectCard';

export const ObjectsCards = memo(() => {
  const openedIds = useAppSelector(selectOpenedEntitiesCard);
  const entityOnMove = useAppSelector(selectEntityOnMove);
  if (openedIds.length === 0) {
    return null;
  }

  if (entityOnMove) {
    return null;
  }
  return (
    <>
      {openedIds.map((id) => (
        <ObjectsCard id={id} key={id} />
      ))}
    </>
  );
});

export default ObjectsCards;
