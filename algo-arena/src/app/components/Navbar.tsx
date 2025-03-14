import React from 'react';
import styles from './Navbar.module.css';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    return (
        <div className={`${styles["navbar-container-wrapper"]} bg-black`}>
            <div className={`${styles["navbar-container"]} flex-row`}>
                <div className={`${styles["navbar-leftside"]} flex-row align-items-center`}>
                    <div className={`${styles["logo-container"]}`}>
                        ALGO - ARENA
                    </div>
                </div>
                <div className={`${styles["navbar-rightside"]}`}>

                </div>
            </div>
        </div>
    )
}
export default Navbar;