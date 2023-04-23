import { EntityId } from "@reduxjs/toolkit";
import { memo, useCallback } from "react";
import { IEntityState } from "../../../../../game/entities/base/GameEntity/GameEntity";
import {
  GroupEntity,
  IGroupEntityAddsState,
} from "../../../../../game/entities/base/GroupEntity/GroupEntity";
import { IndependentGameEntity } from "../../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity";
import { EntityManager } from "../../../../../game/entities/EntityManager";
import { GameCamera } from "../../../../../game/renderer/gameCamera/GameCamera";
import { selectEntityById } from "../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { useAppSelector } from "../../../../../store/store";

const useEntityCardMenu = (id: EntityId) => {
  const entityState = useAppSelector(selectEntityById(id)) as IEntityState;
  const entityInstance = EntityManager.getEntityById(id);

  const toInventory = useCallback(() => {
    entityInstance?.placeInInventory();
  }, [entityInstance]);

  const toMove = useCallback(() => {
    if (entityInstance instanceof IndependentGameEntity) {
      if (entityInstance.placed.position) {
        const { x, y } = entityInstance.placed.position;
        GameCamera.setTargetPosition(x, 0, y);
      }
      entityInstance.setIsOnMove(true);
    }
  }, [entityInstance]);

  // didn't useState because of infinity rerenders
  let disableMoveAndHide = false;
  if (entityInstance instanceof GroupEntity) {
    const haveEntity = !!(entityState.adds as IGroupEntityAddsState).entities.length;
    disableMoveAndHide = haveEntity;
  }

  return {
    toInventory,
    toMove,
    disableMoveAndHide,
  };
};

interface IEntityCardMenuProps {
  toInventory: () => void;
  toMove: () => void;
  disableMoveAndHide: boolean;
}

const EntityCardMenu = memo<IEntityCardMenuProps>(({ toInventory, toMove, disableMoveAndHide }) => {
  return (
    <div>
      <button onClick={toInventory} disabled={disableMoveAndHide}>
        <span className="material-symbols-outlined">inventory_2</span>
      </button>
      <button onClick={toMove} disabled={disableMoveAndHide}>
        <span className="material-symbols-outlined">open_with</span>
      </button>
    </div>
  );
});
EntityCardMenu.displayName = "EntityCardMenu";

export { EntityCardMenu, useEntityCardMenu };
