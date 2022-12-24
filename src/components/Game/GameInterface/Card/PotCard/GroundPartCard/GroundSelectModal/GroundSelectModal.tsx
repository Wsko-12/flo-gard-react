import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { EGameEntityTypes } from '../../../../../../../game/entities/base/GameEntity/GameEntity';
import { selectEntitiesIdsByType } from '../../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../../../../store/store';
import { Modal } from '../../../../../../Modal/Modal';
import GroundSelectItem from './GroundSelectItem';

interface IGroundSelectModalProps {
  close: () => void;
  select: (ground: EntityId) => void;
}
const GroundSelectModal = memo<IGroundSelectModalProps>(({ close, select }) => {
  const ids = useAppSelector(selectEntitiesIdsByType(EGameEntityTypes.potGround));
  return (
    <Modal close={close}>
      {ids.map((id) => (
        <GroundSelectItem key={id} id={id} select={select} />
      ))}
    </Modal>
  );
});

export default GroundSelectModal;
