import { IInventoryObjectStoreData } from '../interfaces';

export class InventoryObject {
  getStoreData(): IInventoryObjectStoreData {
    return {
      imageUrl: '',
      title: '',
      static: false,
    };
  }
}
