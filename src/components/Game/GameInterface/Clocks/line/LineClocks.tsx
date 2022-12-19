import React, { memo } from 'react';
import { FULL_DAY_TIME } from '../../../../../game/world/day/Day';

import styles from './line-clocks.module.scss';

const getSunPosition = (time: number) => {
  return `translateX(${(time / FULL_DAY_TIME) * 100 * 10}%)`;
  // return `translateX(0%)`;
};
interface ILineClocksProps {
  dayTime: number;
}

const LineClocks = memo<ILineClocksProps>(({ dayTime }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.timer}>
          <div
            className={styles.timer_icon_container}
            style={{ transform: getSunPosition(dayTime) }}
          >
            <span className={`material-symbols-outlined ${styles.timer_icon}`}>brightness_5</span>
          </div>
        </div>

        <div className={styles.bar}></div>
      </div>
    </div>
  );
});

export default LineClocks;
