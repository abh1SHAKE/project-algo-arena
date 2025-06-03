import React from 'react';
import styles from './Playground.module.css';
import PreferenceNavbar from './PreferenceNavbar/PreferenceNavbar';

const Playground:React.FC = () => {
    return (
        <div className={`${styles["playground-wrapper"]}`}>
            <div className={`${styles["preference-navbar"]}`}>
                <PreferenceNavbar/>
            </div>
        </div>
    )
}
export default Playground;