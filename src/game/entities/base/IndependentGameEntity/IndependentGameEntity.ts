import { BufferGeometry, Group, Mesh } from 'three';
import { toggleCardOpened } from '../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';
import { store } from '../../../../store/store';
import { IPosition2 } from '../../../../ts/interfaces';
import { Point2 } from '../../../world/environment/utils/Geometry';
import World from '../../../world/World';
import { GameEntity, IEntityState } from '../GameEntity/GameEntity';
import { ClickBox } from './ClickBox/ClickBox';
import { IndependentGameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IIndependentEntityState extends IEntityState {
  position: IPosition2 | null;
}

export abstract class IndependentGameEntity extends GameEntity {
  abstract mesh: Mesh | Group;
  abstract clickGeometry: BufferGeometry;
  public readonly isIndependent = true;
  public position: Point2 | null = null;

  public storeManager: IndependentGameEntityStoreManager;
  protected clickBox: ClickBox | null = null;

  constructor() {
    super();
    this.storeManager = new IndependentGameEntityStoreManager(this);
  }

  public init() {
    super.init();
    this.clickBox = new ClickBox(this.clickGeometry, this.onClick);
  }

  public placeInWorld() {
    World.getScene().add(this.mesh);
    this.clickBox?.add();
    super.placeInWorld();
  }

  public openCard() {
    store.dispatch(toggleCardOpened(this.id));
  }

  private onClick = () => {
    this.openCard();
  };
}
