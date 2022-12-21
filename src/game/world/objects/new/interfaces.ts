import { EntityId } from '@reduxjs/toolkit';

export interface IWorldObjectStoreData {
  position: { x: number; y: number } | null;
  isMovable: boolean;
}

export interface IInventoryObjectStoreData {
  imageUrl: string;
  title: string;
  static: boolean;
}

export interface IGameEntityStoreData {
  id: EntityId;
  inInventory: boolean;
  world: IWorldObjectStoreData;
  inventory: IInventoryObjectStoreData;
}
