import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useCallback } from 'react';
import { EntityManager } from '../../../../../../game/world/objects/EntityManager';
import { setEntityOnMove } from '../../../../../../store/slices/gameEntityOnEdit/gameEntityOnEdit';
import {
  selectEntityDataById,
  toggleEntityCardOpened,
} from '../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import DraggableCard from '../../DraggableCard/DraggableCard';
import styles from './object-card.module.scss';

interface IObjectsCardProps {
  id: EntityId;
}
export const ObjectsCard = memo<IObjectsCardProps>(({ id }) => {
  const data = useAppSelector(selectEntityDataById(id));
  const dispatch = useAppDispatch();

  const closeCb = useCallback(() => {
    dispatch(toggleEntityCardOpened(id));
  }, [dispatch, id]);

  const placeToInventory = () => {
    EntityManager.placeEntityToInventory(id);
  };

  const setMove = () => {
    dispatch(setEntityOnMove(id));
  };

  if (!data) {
    return null;
  }

  return (
    <DraggableCard closeCb={closeCb}>
      <div className={styles.card}>{data.inventory.title}</div>
      <button onClick={setMove}>Move</button>
      <button onClick={placeToInventory}>To inventory</button>
    </DraggableCard>
  );
});

export default ObjectsCard;
