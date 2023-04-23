import { memo } from "react";
import styles from "./entity-card-progress-slider.module.scss";

interface IEntityCardProgressSliderProps {
  value: number;
  icon?: string;
}

const EntityCardProgressSlider = memo<IEntityCardProgressSliderProps>(({ value, icon }) => {
  const clipped = Math.min(5, value);

  return (
    <div className={styles.container}>
      {icon && <span className="material-symbols-outlined">{icon}</span>}

      <div className={styles.bar}>
        {new Array(clipped).fill(null).map((_, i) => (
          <div className={styles.item} key={i}></div>
        ))}
      </div>
    </div>
  );
});
EntityCardProgressSlider.displayName = "EntityCardProgressSlider";

export { EntityCardProgressSlider };
