import { EntityId } from '@reduxjs/toolkit';

export interface IWorldObjectStoreData {
  position: { x: number; y: number } | null;
}

export interface IInventoryObjectStoreData {
  imageUrl: string;
  title: string;
  static: boolean;
}

export interface IGameEntityStoreData {
  id: EntityId;
  world: IWorldObjectStoreData;
  inventory: IInventoryObjectStoreData;
}
