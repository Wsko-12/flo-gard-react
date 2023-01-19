import { EGameEntityTypes } from '../../base/GameEntity/GameEntity';
import { GroupEntity } from '../../base/GroupEntity/GroupEntity';

export abstract class GreenHouse extends GroupEntity {
  type = EGameEntityTypes.greenHouse;
}
