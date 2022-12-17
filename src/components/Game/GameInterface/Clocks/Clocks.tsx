import React, { memo } from 'react';
import styles from './clocks.module.scss';

const Clocks = memo(() => {
    
    return (
        <div className={styles.container}>
            <div className={styles.timer}>
                <div className={styles.timer_icon_container}>
                    <span className={`material-symbols-outlined ${styles.timer_icon}`}>
                        brightness_5
                    </span>
                </div>
                <div className={styles.timer_icon_container}>
                    <span className={`material-symbols-outlined ${styles.timer_icon}`}>
                        dark_mode
                    </span>
                </div>
            </div>

            <div className={styles.bar}></div>
        </div>
    );
});

export default Clocks;