'use client'
import React from 'react';
import styles from './Login.module.css'
import { useDispatch } from 'react-redux';
import { setModalState } from '../redux/slices/authModalSlice';

const Login:React.FC = () => {
    const dispatch = useDispatch();

    const handleClick = (type: "login" | "signup" | "forgotPassword") => {
        dispatch(setModalState({isOpen: true, type}));
    }
    return (
        <form>
            <div className={`${styles["form-heading"]}`}>
                LOG IN TO <span className='text-aquamarine'>ALGO - ARENA</span>
            </div>
            <div className={`${styles["form-container"]} flex-column`}>
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='email' className={styles["label"]}>Your email</label>
                    <input type='email' name='email' id='email' placeholder='Enter your email' className='input'></input>
                </div>
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='password' className={styles["label"]}>Your password</label>
                    <input type='password' name='password' id='password' placeholder='Enter your password' className='input'></input>
                </div>
            </div>
            <div className={`${styles["cta-container"]} flex-column`}>
                <div className={`${styles["cta-container-top"]} flex-row align-items-center justify-content-space-between`}>
                    <div onClick={() => handleClick("forgotPassword")}>
                        <a className='text-white cursor-pointer'>FORGOT PASSWORD?</a>
                    </div>
                    <div>
                        <button>
                            LOGIN
                        </button>
                    </div>
                </div>
                <div className={`${styles["cta-container-bottom"]} flex-row justify-content-center`}>
                    <span>Not Registered?</span>
                    <a className='text-white cursor-pointer' onClick={() => handleClick("signup")}>CREATE ACCOUNT</a>
                </div>
            </div>
        </form>
    )
}
export default Login;