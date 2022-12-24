import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useState } from 'react';
import { Pot } from '../../../../../../game/entities/entities/pots/Pot';
import { EntityManager } from '../../../../../../game/entities/EntityManager';
import { selectEntityById } from '../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../../../store/store';
import GroundSelectModal from './GroundSelectModal/GroundSelectModal';

interface IGroundPartCardProps {
  potId: EntityId;
  groundId: EntityId | null;
}

const GroundPartCard = memo<IGroundPartCardProps>(({ groundId, potId }) => {
  const groundState = useAppSelector(selectEntityById(groundId));
  const potInstance = EntityManager.getEntityById(potId);
  const [isGroundSelect, setIsGroundSelect] = useState(false);

  if (!potInstance || !(potInstance instanceof Pot)) {
    return null;
  }

  if (!groundId) {
    return isGroundSelect ? (
      <GroundSelectModal
        close={() => setIsGroundSelect(false)}
        select={(groundId) => {
          potInstance.setGround(groundId);
          setIsGroundSelect(false);
        }}
      />
    ) : (
      <button onClick={() => setIsGroundSelect(true)}>Add ground</button>
    );
  }

  if (!groundState || !potInstance || !(potInstance instanceof Pot)) {
    return null;
  }

  return (
    <div>
      Ground <button onClick={() => potInstance.setGround(null)}>Remove</button>
    </div>
  );
});

export default GroundPartCard;
