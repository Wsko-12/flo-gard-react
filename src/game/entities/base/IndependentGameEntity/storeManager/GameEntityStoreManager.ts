import {
  selectEntityById,
  selectEntityOnMove,
} from '../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { store } from '../../../../../store/store';
import { GameEntityStoreManager } from '../../GameEntity/storeManager/GameEntityStoreManager';
import { IIndependentEntityState, IndependentGameEntity } from '../IndependentGameEntity';

export class IndependentGameEntityStoreManager extends GameEntityStoreManager {
  entity: IndependentGameEntity;

  constructor(entity: IndependentGameEntity) {
    super(entity);
    this.entity = entity;
    this.subscribe();
  }

  public getState(): IIndependentEntityState {
    const base = super.getState();
    const { position } = this.entity;
    return {
      ...base,
      position: position ? position.getPositionObject() : null,
      isRotate: this.entity.isRotate,
    };
  }

  protected storeListener() {
    const globalState = store.getState();
    const state = selectEntityById(this.entity.id)(globalState);

    const onMove = selectEntityOnMove(globalState) === this.entity.id;
    this.entity.setIsOnMove(onMove);

    super.storeListener(state);
  }

  // update() {
  //   // const data = this.getState();
  //   // store.dispatch(...)
  // }
}
