import React, { memo } from 'react';
import { selectSelectedObjectsIds } from '../../../../../store/slices/worldGameObject/worldGameObject';
import { useAppSelector } from '../../../../../store/store';
import ObjectsCard from './ObjectCard/ObjectCard';


export const ObjectsCards = memo(() => {
    const selectedIds = useAppSelector(selectSelectedObjectsIds);

    if(selectedIds.length === 0){
        return null;
    }
    return (
        <>
            {selectedIds.map(id => <ObjectsCard id={id} key={id}/>)}
        </>
    );
});

export default ObjectsCards;