import { IInventoryObjectStoreData } from '../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice';

export abstract class InventoryObject {
  abstract title: string;
  abstract imageUrl: string;
  abstract static: boolean;
  getStoreData(): IInventoryObjectStoreData {
    return {
      imageUrl: this.imageUrl,
      title: this.title,
      static: this.static,
    };
  }
}