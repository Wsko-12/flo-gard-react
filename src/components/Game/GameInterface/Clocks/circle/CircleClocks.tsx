import React, { memo } from 'react';
import { FULL_DAY_TIME } from '../../../../../game/world/day/Day';
import { selectDayTime } from '../../../../../store/slices/gameSlice/gameSelectors';
import { useAppSelector } from '../../../../../store/store';

import styles from './circle-clocks.module.scss';

const getSunAngle = (time: number) => {
    return `rotate(${(time / FULL_DAY_TIME * 0.5) * 360}deg)`;
    // return `translateX(0%)`;
}


const CircleClocks = memo(() => {
    const dayTime = useAppSelector(selectDayTime);
    
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.timer} style={{transform: getSunAngle(dayTime)}}>
                    <div className={styles.timer_icon_container}>
                        <span className={`material-symbols-outlined ${styles.timer_icon}`}>
                            brightness_5
                        </span>
                    </div>
                </div>
                <div className={styles.bar}></div>
            </div>

        </div>
    );
});

export default CircleClocks;