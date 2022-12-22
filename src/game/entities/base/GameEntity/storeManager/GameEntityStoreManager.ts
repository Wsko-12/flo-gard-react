import { updateEntity } from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { store } from '../../../../../store/store';
import { GameEntity, IEntityState } from '../GameEntity';

export class GameEntityStoreManager {
  entity: GameEntity;
  unsubscribe = () => {};
  constructor(entity: GameEntity) {
    this.entity = entity;

    this.subscribe();
  }

  private subscribe() {
    this.unsubscribe = store.subscribe(this.storeListener);
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

  protected storeListener = () => {
    // const data = selectEntityById();
    // this.entity.inInventory = data.inInventory;
  };

  updateState() {
    store.dispatch(updateEntity(this.getState()));
  }
}
