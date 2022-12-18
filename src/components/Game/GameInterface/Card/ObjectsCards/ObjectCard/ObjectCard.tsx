import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { selectGameObjectById } from '../../../../../../store/slices/gameObject/gameObject';
import { useAppSelector } from '../../../../../../store/store';
import MoveButton from './MoveButton/MoveButton';
import styles from './object-card.module.scss';

interface IObjectsCardProps {
    id: EntityId;
}
export const ObjectsCard = memo<IObjectsCardProps>(({ id }) => {
    const data = useAppSelector(selectGameObjectById(id));

    if(!data){
        return null;
    }

    return (
        <div className={styles.card}>
            {data.id}
            <MoveButton id={data.id} isMovable={data.isMovable}/>
        </div>
    );
});

export default ObjectsCard;