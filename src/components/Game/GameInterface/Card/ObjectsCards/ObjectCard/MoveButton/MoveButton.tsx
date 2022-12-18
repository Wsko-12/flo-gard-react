import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { selectGameObjectOnMove, setOnMoveObject } from '../../../../../../../store/slices/gameObject/gameObject';
import { useAppDispatch, useAppSelector } from '../../../../../../../store/store';

interface IMoveButtonProps {
    isMovable: boolean;
    id: EntityId;
}

const MoveButton = memo<IMoveButtonProps>(({isMovable, id}) => {
    const objectOnMove = useAppSelector(selectGameObjectOnMove);
    const dispatch = useAppDispatch();
    
    const moveObject = () => {
        dispatch(setOnMoveObject(id));
    }
    const applyMove = () => {
        dispatch(setOnMoveObject(null));
    }

    if(!isMovable) {
        return null;
    }

    if(objectOnMove === null){
        return  <button onClick={moveObject}>Move</button>
    }

    if(objectOnMove === id) {
        return  <button onClick={applyMove}>Apply</button>
    }

    return null;
});

export default MoveButton;