import { EntityId } from '@reduxjs/toolkit';
import { Group, Mesh } from 'three';
import { generateEntityId } from '../../../../utils/utils';
import { EntityManager } from '../../EntityManager';
import { GameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IEntityInventoryData {
  title: string;
}

export interface IEntityState {
  id: EntityId;
  inInventory: boolean;
  inventoryData: IEntityInventoryData;
  isIndependent: boolean;
}

export abstract class GameEntity {
  public readonly id: string;
  protected abstract mesh: Mesh | Group | null;
  public readonly isIndependent: boolean = false;

  public inInventory = true;
  abstract readonly inventoryData: IEntityInventoryData;

  public storeManager: GameEntityStoreManager;

  constructor() {
    this.id = generateEntityId();
    this.storeManager = new GameEntityStoreManager(this);
  }

  public init() {
    EntityManager.addEntity(this);
  }

  public placeInWorld() {
    this.inInventory = false;
    this.storeManager.updateState();
  }

  public placeInInventory() {
    this.inInventory = true;
    this.storeManager.updateState();
  }

  public getMesh() {
    return this.mesh;
  }
}
