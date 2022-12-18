import React, { memo, useEffect } from 'react';
import { selectSelectedObjectsIds } from '../../../../store/slices/gameObject/gameObject';
import { useAppSelector } from '../../../../store/store';

export const ObjectsCards = memo(() => {
    const selectedIds = useAppSelector(selectSelectedObjectsIds);

    useEffect(() => {
        console.log(selectedIds)
    })
    return (
        <div>
            
        </div>
    );
});

export default ObjectsCards;