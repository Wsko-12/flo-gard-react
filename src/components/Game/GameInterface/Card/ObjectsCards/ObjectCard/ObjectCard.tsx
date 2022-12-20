import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useCallback } from 'react';
import {
  selectGameObjectById,
  toggleCardOpenedGameObject,
} from '../../../../../../store/slices/worldGameObjects/worldGameObjects';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import DraggableCard from '../../DraggableCard/DraggableCard';
import EditObjectBar from '../EditObjectBar';
import styles from './object-card.module.scss';

interface IObjectsCardProps {
  id: EntityId;
}
export const ObjectsCard = memo<IObjectsCardProps>(({ id }) => {
  const data = useAppSelector(selectGameObjectById(id));
  const dispatch = useAppDispatch();

  const closeCb = useCallback(() => {
    dispatch(toggleCardOpenedGameObject(id));
  }, [dispatch, id]);

  if (!data) {
    return null;
  }

  return (
    <DraggableCard closeCb={closeCb}>
      <div className={styles.card}>
        {data.id}
        <EditObjectBar id={data.id} />
      </div>
    </DraggableCard>
  );
});

export default ObjectsCard;
