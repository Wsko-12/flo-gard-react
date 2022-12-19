import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useCallback } from 'react';
import { selectGameObjectById, toggleSelectGameObject } from '../../../../../../store/slices/worldGameObjects/worldGameObjects';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import DraggableCard from '../../DraggableCard/DraggableCard';
import MoveButton from './MoveButton/MoveButton';
import styles from './object-card.module.scss';

interface IObjectsCardProps {
    id: EntityId;
}
export const ObjectsCard = memo<IObjectsCardProps>(({ id }) => {
    const data = useAppSelector(selectGameObjectById(id));
    const dispatch = useAppDispatch();

    const closeCb = useCallback(() => {
        if(!data){
            return;
        }
        dispatch(toggleSelectGameObject({
            ...data,
            isSelected: false,
        }))
    }, [data, dispatch])


    if(!data){
        return null;
    }


    return (
        <DraggableCard closeCb={closeCb}>
            <div className={styles.card}>
                {data.id}
                <MoveButton id={data.id} isMovable={data.isMovable}/>
            </div>
        </DraggableCard>
    );
});

export default ObjectsCard;