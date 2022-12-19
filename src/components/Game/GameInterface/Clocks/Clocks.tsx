import React, { useEffect, useState } from 'react';
import {
  EClocksInterfaceType,
  setInterfaceClocksType,
} from '../../../../store/slices/gameInterfaceSettings/gameInterfaceSettings';
import { selectClocksInterfaceType } from '../../../../store/slices/gameInterfaceSettings/gameInterfaceSettingsSelectors';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import CircleClocks from './circle/CircleClocks';
import LineClocks from './line/LineClocks';
import styles from './clocks.module.scss';
import Day from '../../../../game/world/day/Day';
const Clocks = () => {
  const type = useAppSelector(selectClocksInterfaceType);
  const dispatch = useAppDispatch();
  const [dayTime, setDayTime] = useState(0);

  const changeTimeCb = (time: number) => {
    setDayTime(time);
  };

  useEffect(() => {
    Day.subscribe(changeTimeCb);
    return () => Day.unsubscribe(changeTimeCb);
  }, []);

  const changeClocksType = () => {
    const nextType =
      type === EClocksInterfaceType.circle
        ? EClocksInterfaceType.line
        : EClocksInterfaceType.circle;
    dispatch(setInterfaceClocksType(nextType));
  };

  return (
    <div className={styles.clocks} onClick={changeClocksType}>
      {type === EClocksInterfaceType.circle ? (
        <CircleClocks dayTime={dayTime} />
      ) : (
        <LineClocks dayTime={dayTime} />
      )}
    </div>
  );
};

export default Clocks;
