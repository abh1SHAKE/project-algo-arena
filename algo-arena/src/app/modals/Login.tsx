'use client'
import React, { useState } from 'react';
import styles from './Login.module.css'
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase'
import { useRouter } from 'next/navigation';
import { setModalState } from '../redux/slices/authModalSlice';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const Login:React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = (type: "login" | "signup" | "forgotPassword") => {
        dispatch(setModalState({isOpen: true, type}));
    };

    const [inputs, setInputs] = useState({email: "", password: ""});

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = await signInWithEmailAndPassword(
                inputs.email, inputs.password
            );

            if(!user) return;
            router.push("/arenas");

        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert("Unknown error has occured");
            }
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div className={`${styles["form-heading"]}`}>
                LOG IN TO <span className='text-aquamarine arena-font'>ALGO - ARENA</span>
            </div>
            <div className={`${styles["form-container"]} flex-column`}>
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='email' className={styles["label"]}>Your email</label>
                    <input
                        onChange={handleInputChange}
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='Enter your email' 
                        className='input'
                    >    
                    </input>
                </div>
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='password' className={styles["label"]}>Your password</label>
                    <input
                        onChange={handleInputChange}
                        type='password'
                        name='password' 
                        id='password' 
                        placeholder='Enter your password' 
                        className='input'
                    >
                    </input>
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