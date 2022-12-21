import React, { memo } from 'react';
import { EntityManager } from '../../../../game/world/objects/new/EntityManager';
import { selectEntityOnMove } from '../../../../store/slices/gameEntityOnEdit/gameEntityOnEdit';
import { useAppSelector } from '../../../../store/store';
import styles from './entity-move-bar.module.scss';
const EntityMoveBar = memo(() => {
  const entityOnMove = useAppSelector(selectEntityOnMove);

  if (!entityOnMove) {
    return null;
  }

  const applyMove = () => {
    EntityManager.applyEntityMove(entityOnMove);
  };

  const cancelMove = () => {
    EntityManager.cancelEntityMove(entityOnMove);
  };

  return (
    <div className={styles.container}>
      <button onClick={applyMove}>apply</button>
      <button onClick={cancelMove}>cancel</button>
    </div>
  );
});

export default EntityMoveBar;
