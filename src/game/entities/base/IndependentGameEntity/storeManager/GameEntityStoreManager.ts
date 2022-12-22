import { GameEntityStoreManager } from '../../GameEntity/storeManager/GameEntityStoreManager';
import { IIndependentEntityState, IndependentGameEntity } from '../IndependentGameEntity';

export class IndependentGameEntityStoreManager extends GameEntityStoreManager {
  entity: IndependentGameEntity;

  constructor(entity: IndependentGameEntity) {
    super(entity);
    this.entity = entity;
  }

  public getState(): IIndependentEntityState {
    const base = super.getState();

    const { position } = this.entity;
    return {
      ...base,
      position: position ? position.getPositionObject() : null,
    };
  }

  protected storeListener = () => {
    // const data = {} as IEntityState;
    // this.entity.inInventory = data.inInventory;
  };

  update() {
    // const data = this.getState();
    // store.dispatch(...)
  }
}
