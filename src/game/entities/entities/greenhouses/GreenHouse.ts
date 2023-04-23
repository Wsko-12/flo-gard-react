import { EGameEntityTypes } from "../../base/GameEntity/GameEntity";
import { GroupEntity } from "../../base/GroupEntity/GroupEntity";
import { IndependentGameEntity } from "../../base/IndependentGameEntity/IndependentGameEntity";

export abstract class GreenHouse extends GroupEntity {
  type = EGameEntityTypes.greenHouse;
  public canAcceptEntity(entity: IndependentGameEntity): boolean {
    if (entity instanceof GreenHouse) {
      return false;
    }

    return this.collider.isColliderInside(entity.getCollider());
  }
}
