import {
  removeGameEntity,
  updateEntity,
} from "../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { store } from "../../../../../store/store";
import { GameEntity, IEntityState } from "../GameEntity";

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
    const { id, inInventory, inventoryData, isIndependent, type } = this.entity;

    return {
      id,
      type,
      inInventory,
      inventoryData,
      isIndependent,
      adds: this.entity.getAddsState(),
    };
  }

  protected storeListener(state?: IEntityState) {
    return;
    // if (!state) {
    //   const globalState = store.getState();
    //   state = selectEntityById(this.entity.id)(globalState);
    // }
    // if (!state) {
    //   return;
    // }
  }

  public updateState() {
    store.dispatch(updateEntity(this.getState()));
  }

  public removeState() {
    store.dispatch(removeGameEntity(this.entity.id));
  }
}
