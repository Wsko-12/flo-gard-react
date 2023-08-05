import { Plant } from "../Plant";
import { EPotSizes } from "../../pots/Pot";
import { IEntityInventoryData } from "../../../base/GameEntity/GameEntity";

class Opuntia extends Plant {
  growTime = 500;

  size = EPotSizes.M;

  inventoryData: IEntityInventoryData = {
    title: "Opuntia",
  };

  constructor() {
    super("opuntia", 2);
    this.init();
  }
}

export { Opuntia };
