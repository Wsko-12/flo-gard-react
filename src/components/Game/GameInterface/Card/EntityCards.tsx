import React, { memo } from 'react';
import { selectOpenedCardsIds } from '../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../store/store';
import EntityCard from './EntityCard';

const EntityCards = memo(() => {
  const ids = useAppSelector(selectOpenedCardsIds);
  return (
    <div>
      {ids.map((id) => (
        <EntityCard key={id} id={id} />
      ))}
    </div>
  );
});

export default EntityCards;
