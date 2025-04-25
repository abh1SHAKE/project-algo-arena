import React from 'react';
import styles from './page.module.css'
import Navbar from '../components/Navbar';
import ArenaCarousel from './components/ArenaCarousel';

const ArenaPage:React.FC = () => {
    return (
        <div className={`${styles["arena-page-wrapper"]}`}>
            <div className={styles["navbar"]}>
                <Navbar/>
            </div>
            <div className={`${styles["carousel-wrapper"]}`}>
                <ArenaCarousel/>
            </div>
        </div>
    )
}
export default ArenaPage;