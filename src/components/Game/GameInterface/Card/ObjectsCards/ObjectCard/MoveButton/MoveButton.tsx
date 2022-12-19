import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { selectEditedObject, selectEditedObjectIsOnMove, setEditedObject, setIsOnMove } from '../../../../../../../store/slices/gameObjectOnEdit/gameObjectOnEdit';
import { useAppDispatch, useAppSelector } from '../../../../../../../store/store';

interface IMoveButtonProps {
    isMovable: boolean;
    id: EntityId;
}

const MoveButton = memo<IMoveButtonProps>(({isMovable, id}) => {
    const onEditId = useAppSelector(selectEditedObject);
    const objectOnMove = useAppSelector(selectEditedObjectIsOnMove);
    const dispatch = useAppDispatch();
    
    const moveObject = () => {
        dispatch(setEditedObject(id));
        dispatch(setIsOnMove(true));
    }
    const applyMove = () => {
        dispatch(setIsOnMove(false));
    }

    if(!isMovable) {
        return null;
    }

    if(onEditId === null || (onEditId === id && !objectOnMove)){
        return  <button onClick={moveObject}>Move</button>
    }

    if(onEditId === id && objectOnMove) {
        return  <button onClick={applyMove}>Apply</button>
    }

    return null;
});

export default MoveButton;