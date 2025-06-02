'use client'
import React from 'react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/authModalSlice';
import { RootState } from '../redux/store';
import Logout from '../buttons/Logout';

const Navbar:React.FC = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(openModal("login"));
    };

    const { currentUser, isLoading } = useSelector((state: RootState) => state.auth);

    return (
        <div className={`${styles["navbar-container-wrapper"]} user-select-none`}>
            <div className={`${styles["navbar-container"]} flex-row justify-content-space-between`}>
                <div className={`${styles["navbar-leftside"]} flex-row align-items-center`}>
                    <div className={`${styles["logo-container"]} text-aquamarine cursor-pointer`}>
                        ALGO - ARENA
                    </div>
                </div>
                <div className={`${styles["navbar-rightside"]} flex-row align-items-center`}>
                    <div className={`${styles["cta-container"]}`}>
                        {!isLoading ? (
                            currentUser ? (
                                <div className='flex-row align-items-center gap-20'>
                                    <div className={`${styles["display-picture"]} cursor-pointer`}>
                                    </div>
                                    <div>{currentUser.displayName}</div>
                                    <div>
                                        <Logout></Logout>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handleClick}
                                >
                                    SIGN IN
                                </button>
                            )
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;