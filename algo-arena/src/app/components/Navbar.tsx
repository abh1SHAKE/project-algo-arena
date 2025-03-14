import React from 'react';
import styles from './Navbar.module.css';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    return (
        <div className={`${styles["navbar-container-wrapper"]}`}>
            <div className={`${styles["navbar-container"]} flex-row justify-content-space-between`}>
                <div className={`${styles["navbar-leftside"]} flex-row align-items-center`}>
                    <div className={`${styles["logo-container"]} text-aquamarine`}>
                        ALGO - ARENA
                    </div>
                </div>
                <div className={`${styles["navbar-rightside"]} flex-row align-items-center`}>
                    <div className={`${styles["cta-container"]}`}>
                        <button>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;