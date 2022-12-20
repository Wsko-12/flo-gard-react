import { InventoryObject } from './inventoryObject/InventoryObject';
import { WorldObject } from './worldObject/WorldObject';

export abstract class GameEntity {
  worldObject: WorldObject;
  inventoryObject: InventoryObject;
  inInventory = true;
  constructor(worldObject: WorldObject, inventoryObject: InventoryObject) {
    this.worldObject = worldObject;
    this.inventoryObject = inventoryObject;
  }
}
