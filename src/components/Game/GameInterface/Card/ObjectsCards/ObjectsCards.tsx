import React, { memo } from 'react';
import { selectOpenedObjectCardsIds } from '../../../../../store/slices/worldGameObjects/worldGameObjects';
import { useAppSelector } from '../../../../../store/store';
import ObjectsCard from './ObjectCard/ObjectCard';


export const ObjectsCards = memo(() => {
    const openedIds = useAppSelector(selectOpenedObjectCardsIds);

    if(openedIds.length === 0){
        return null;
    }
    return (
        <>
            {openedIds.map(id => <ObjectsCard id={id} key={id}/>)}
        </>
    );
});

export default ObjectsCards;