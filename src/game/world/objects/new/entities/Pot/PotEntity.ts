import { generateGameObjectId } from '../../../../../../utils/utils';
import { GameEntity } from '../../GameEntity';
import { PotInventory } from './PotInventory';
import { PotWorld } from './PotWorld';

export class PotEntity extends GameEntity {
  constructor() {
    const id = generateGameObjectId();
    const worldObject = new PotWorld(id);
    const inventoryObject = new PotInventory();
    super(id, worldObject, inventoryObject);
  }
}
