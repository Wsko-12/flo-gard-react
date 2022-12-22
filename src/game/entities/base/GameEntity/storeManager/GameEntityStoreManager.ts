import {
  selectEntityById,
  updateEntity,
} from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { store } from '../../../../../store/store';
import { GameEntity, IEntityState } from '../GameEntity';

export class GameEntityStoreManager {
  entity: GameEntity;
  unsubscribe = () => {};
  constructor(entity: GameEntity) {
    this.entity = entity;
    this.subscribe();
  }

  protected subscribe() {
    this.unsubscribe();
    this.unsubscribe = store.subscribe(() => this.storeListener());
  }

  public getState(): IEntityState {
    const { id, inInventory, inventoryData, isIndependent } = this.entity;
    return {
      id,
      inInventory,
      inventoryData,
      isIndependent,
    };
  }

  protected storeListener(state?: IEntityState) {
    if (!state) {
      const globalState = store.getState();
      state = selectEntityById(this.entity.id)(globalState);
    }

    if (!state) {
      return;
    }
  }

  updateState() {
    store.dispatch(updateEntity(this.getState()));
  }
}
