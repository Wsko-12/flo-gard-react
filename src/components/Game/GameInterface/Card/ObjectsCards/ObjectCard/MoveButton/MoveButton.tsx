import React, { memo } from 'react';
import { setIsOnMove } from '../../../../../../../store/slices/gameObjectOnEdit/gameObjectOnEdit';
import { useAppDispatch } from '../../../../../../../store/store';

interface IMoveButtonProps {
  isMovable: boolean;
  isOnMove: boolean;
}

const MoveButton = memo<IMoveButtonProps>(({ isMovable, isOnMove }) => {
  const dispatch = useAppDispatch();

  if (!isMovable) {
    return null;
  }

  const moveObject = () => {
    dispatch(setIsOnMove(true));
  };
  const applyMove = () => {
    dispatch(setIsOnMove(false));
  };

  if (!isOnMove) {
    return <button onClick={moveObject}>Move</button>;
  }

  if (isOnMove) {
    return <button onClick={applyMove}>Apply</button>;
  }

  return null;
});

export default MoveButton;
