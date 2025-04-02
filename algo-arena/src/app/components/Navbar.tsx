'use client'
import React from 'react';
import styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/authModalSlice';

const Navbar:React.FC = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(openModal("login"));
    };

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
                        <button
                            onClick={handleClick}
                        >
                            SIGN IN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;