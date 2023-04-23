import { memo } from "react";
import { FULL_DAY_TIME } from "../../../../../game/world/day/Day";

import styles from "./circle-clocks.module.scss";

const getSunAngle = (time: number) => {
  return `rotate(${(time / FULL_DAY_TIME) * 0.5 * 360}deg)`;
  // return `translateX(0%)`;
};

interface ICircleClocksProps {
  dayTime: number;
}

const CircleClocks = memo<ICircleClocksProps>(({ dayTime }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.timer} style={{ transform: getSunAngle(dayTime) }}>
          <div className={styles.timer_icon_container}>
            <span className={`material-symbols-outlined ${styles.timer_icon}`}>brightness_5</span>
          </div>
        </div>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
});
CircleClocks.displayName = "CircleClocks";

export { CircleClocks };
