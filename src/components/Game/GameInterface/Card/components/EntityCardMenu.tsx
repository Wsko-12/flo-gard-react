import React, { memo, useCallback } from 'react';
import { GameEntity } from '../../../../../game/entities/base/GameEntity/GameEntity';
import { IndependentGameEntity } from '../../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity';

export const useEntityCardMenu = (entityInstance: GameEntity | null) => {
  const toInventory = useCallback(() => {
    entityInstance?.placeInInventory();
  }, [entityInstance]);

  const toMove = useCallback(() => {
    if (entityInstance instanceof IndependentGameEntity) {
      entityInstance.setIsOnMove(true);
    }
  }, [entityInstance]);
  return {
    toInventory,
    toMove,
  };
};

interface IEntityCardMenuProps {
  toInventory: () => void;
  toMove: () => void;
}
const EntityCardMenu = memo<IEntityCardMenuProps>(({ toInventory, toMove }) => {
  return (
    <div>
      <button onClick={toInventory}>
        <span className="material-symbols-outlined">inventory_2</span>
      </button>
      <button onClick={toMove}>
        <span className="material-symbols-outlined">open_with</span>
      </button>
    </div>
  );
});

export default EntityCardMenu;
