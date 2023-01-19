import { EntityId } from '@reduxjs/toolkit';
import { Group, Mesh } from 'three';
import { generateEntityId } from '../../../../utils/utils';
import { GameStore } from '../../../gameStore/GameStore';
import { EntityManager } from '../../EntityManager';
import { GameEntityStoreManager } from './storeManager/GameEntityStoreManager';

export interface IEntityInventoryData {
  title: string;
}

export interface IEntityAddsState {
  title?: string;
}

export interface IEntityState {
  id: EntityId;
  type: EGameEntityTypes;
  inInventory: boolean;
  inventoryData: IEntityInventoryData;
  isIndependent: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adds: IEntityAddsState | null;
}

export enum EGameEntityTypes {
  test = 'TEST',
  potGround = 'POT_GROUND',
  pot = 'POT',
  stand = 'STAND',
  greenHouse = 'GREEN_HOUSE',
}

export abstract class GameEntity {
  public readonly id: string;
  public abstract type: EGameEntityTypes;
  protected mesh: Mesh | Group | null = null;
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
    GameStore.lastClick.centralize();
  }

  public placeInInventory() {
    this.inInventory = true;
    this.storeManager.updateState();
  }

  public getMesh() {
    return this.mesh;
  }

  public getAddsState(): IEntityAddsState | null {
    return null;
  }

  public remove() {
    EntityManager.removeEntity(this);
    this.storeManager.removeState();
  }
}
