import React from 'react';
import styles from './LoaderScreen.module.css'

const LoaderScreen:React.FC = () => {
    return (
        <div className={`${styles["loader-screen-wrapper"]} flex-column justify-content-center align-items-center`}>
            <div className={`${styles["loader-screen-text"]} arena-font text-aquamarine`}>Algo-Arena</div>
            <div className={`${styles["loader-screen-subtext"]}`}>
                One arena. Infinite algorithms. Who will rise?
            </div>
        </div>
    )
}
export default LoaderScreen;