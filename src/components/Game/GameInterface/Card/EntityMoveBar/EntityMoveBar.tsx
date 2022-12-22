import { EntityId } from '@reduxjs/toolkit';
import { memo } from 'react';
import { IndependentGameEntity } from '../../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity';
import { EntityManager } from '../../../../../game/entities/EntityManager';
import styles from './entity-move-bar.module.scss';

interface IEntityMoveBarProps {
  id: EntityId;
}
const EntityMoveBar = memo<IEntityMoveBarProps>(({ id }) => {
  const entityInstance = EntityManager.getEntityById(id);

  if (!entityInstance || !(entityInstance instanceof IndependentGameEntity)) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button className={styles.apply} onClick={() => entityInstance.applyPosition()}>
        <span className="material-symbols-outlined">done</span>
      </button>
      <button className={styles.cancel} onClick={() => entityInstance.setIsOnMove(false)}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
});

export default EntityMoveBar;
