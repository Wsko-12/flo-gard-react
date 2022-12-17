import React from 'react';
import { EClocksInterfaceType, setInterfaceClocksType } from '../../../../store/slices/gameInterfaceSettings/gameInterfaceSettings';
import { selectClocksInterfaceType } from '../../../../store/slices/gameInterfaceSettings/gameInterfaceSettingsSelectors';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import CircleClocks from './circle/CircleClocks';
import LineClocks from './line/LineClocks';
import styles from './clocks.module.scss';
const Clocks = () => {
    const type = useAppSelector(selectClocksInterfaceType);
    const dispatch = useAppDispatch();

    const changeClocksType = () => {
        const nextType = type === EClocksInterfaceType.circle ? EClocksInterfaceType.line : EClocksInterfaceType.circle;
        dispatch(setInterfaceClocksType(nextType))
    }
    return (
        <div className={styles.clocks} onClick={changeClocksType}>
            {type === EClocksInterfaceType.circle ? <CircleClocks /> : <LineClocks />}
        </div>
    )
};

export default Clocks;