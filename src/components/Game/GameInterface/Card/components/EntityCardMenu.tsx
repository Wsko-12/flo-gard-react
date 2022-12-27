import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useCallback, useState } from 'react';
import { IEntityState } from '../../../../../game/entities/base/GameEntity/GameEntity';
import {
  GroupEntity,
  IGroupEntityAddsState,
} from '../../../../../game/entities/base/GroupEntity/GroupEntity';
import { IndependentGameEntity } from '../../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity';
import { EntityManager } from '../../../../../game/entities/EntityManager';
import { selectEntityById } from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { useAppSelector } from '../../../../../store/store';

export const useEntityCardMenu = (id: EntityId) => {
  const entityState = useAppSelector(selectEntityById(id)) as IEntityState;
  const entityInstance = EntityManager.getEntityById(id);

  const toInventory = useCallback(() => {
    entityInstance?.placeInInventory();
  }, [entityInstance]);

  const toMove = useCallback(() => {
    if (entityInstance instanceof IndependentGameEntity) {
      entityInstance.setIsOnMove(true);
    }
  }, [entityInstance]);

  let disableMove = false;
  if (entityInstance instanceof GroupEntity) {
    const haveEntity = !!(entityState.adds as IGroupEntityAddsState).entities.length;
    disableMove = haveEntity;
  }

  return {
    toInventory,
    toMove,
    disableMove,
  };
};

interface IEntityCardMenuProps {
  toInventory: () => void;
  toMove: () => void;
  disableMove: boolean;
}

const EntityCardMenu = memo<IEntityCardMenuProps>(({ toInventory, toMove, disableMove }) => {
  return (
    <div>
      <button onClick={toInventory}>
        <span className="material-symbols-outlined">inventory_2</span>
      </button>
      <button onClick={toMove} disabled={disableMove}>
        <span className="material-symbols-outlined">open_with</span>
      </button>
    </div>
  );
});

export default EntityCardMenu;
