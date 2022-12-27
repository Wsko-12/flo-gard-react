import { EGameEntityTypes } from '../../base/GameEntity/GameEntity';
import { GroupEntity } from '../../base/GroupEntity/GroupEntity';

export abstract class Stand extends GroupEntity {
  type = EGameEntityTypes.stand;
}
