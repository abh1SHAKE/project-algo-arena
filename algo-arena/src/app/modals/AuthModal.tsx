'use client'
import React from 'react';
import styles from './AuthModal.module.css';
import ResetPassword from './ResetPassword';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import { closeModal } from '../redux/slices/authModalSlice';

const AuthModal:React.FC = () => {
    const dispatch = useDispatch();
    const authModal = useSelector((state: RootState) => state.authModal);

    const handleCloseModal = () => {
        dispatch(closeModal())
    }
    return (
        <>
            <div 
                className={`${styles["auth-modal-background"]} 
                flex-row align-items-center justify-content-center position-absolute bg-black`}
            ></div>
            <div className={`${styles["auth-modal-wrapper"]} position-absolute flex-row align-items-center justify-content-center`}>
                <div className={`${styles["auth-modal-container"]}`}>
                    <div className={`${styles["modal-top-section"]} flex-row`}>
                        <div className={`${styles["close-icon"]}`} onClick={handleCloseModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15">
                                <path fill="#ffffff" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27" />
                            </svg>
                        </div>
                    </div>
                    <div className={`${styles["modal-main-section"]}`}>
                        {
                            authModal.type === "login" ? (
                                <Login/>
                            ) : authModal.type === 'signup' ? (
                                <Signup/>
                            ) : (
                                <ResetPassword/>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default AuthModal;