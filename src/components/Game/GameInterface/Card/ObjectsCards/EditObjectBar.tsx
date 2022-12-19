import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { selectEditedObjectId, selectEditedObjectIsOnMove, setEditedObject } from '../../../../../store/slices/gameObjectOnEdit/gameObjectOnEdit';
import { selectGameObjectById } from '../../../../../store/slices/worldGameObjects/worldGameObjects';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import MoveButton from './ObjectCard/MoveButton/MoveButton';

interface IEditObjectBarProps {
    id: EntityId,
}
const EditObjectBar = memo<IEditObjectBarProps>(({id}) => {
    const objectOnEdit = useAppSelector(selectEditedObjectId);
    const objectData = useAppSelector(selectGameObjectById(id));
    const isOnMove = useAppSelector(selectEditedObjectIsOnMove);
    const dispatch = useAppDispatch();

    const startEdit = () => {
        dispatch(setEditedObject(id));
    }

    const applyEdit = () => {
        dispatch(setEditedObject(null));
    }


    if(objectOnEdit === null){
        return (
            <button onClick={startEdit}>Edit</button>
        );
    }

    if(objectOnEdit === id){
        return (
            <>
                <MoveButton isMovable={!!objectData?.isMovable} isOnMove={isOnMove} />
                <button onClick={applyEdit}>Apply Edit</button>
            </>
        )
    }

    if(objectOnEdit !== id){
        return null
    }

    return null;
});

export default EditObjectBar;