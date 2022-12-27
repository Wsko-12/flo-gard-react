import { EntityId } from '@reduxjs/toolkit';
import { memo, NamedExoticComponent } from 'react';
import { EGameEntityTypes } from '../../../../game/entities/base/GameEntity/GameEntity';
import { IndependentGameEntity } from '../../../../game/entities/base/IndependentGameEntity/IndependentGameEntity';
import { EntityManager } from '../../../../game/entities/EntityManager';
import DefaultCard from './DefaultCard/DefaultCard';
import PotCard from './PotCard/PotCard';

export interface IEntityCardProps {
  id: EntityId;
}

const CardsByEntityType: Partial<Record<EGameEntityTypes, NamedExoticComponent<IEntityCardProps>>> =
  {
    [EGameEntityTypes.pot]: PotCard,
  };

const EntityCard = memo<IEntityCardProps>(({ id }) => {
  const entityInstance = EntityManager.getEntityById(id);

  if (!entityInstance || !(entityInstance instanceof IndependentGameEntity)) {
    return null;
  }

  const type = entityInstance.type;
  const Card = CardsByEntityType[type] || DefaultCard;
  return <>{Card ? <Card id={id} /> : null}</>;
});

export default EntityCard;
