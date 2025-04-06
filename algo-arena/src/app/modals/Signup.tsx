'use client'
import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase'
import { useRouter } from 'next/navigation';
import { setModalState } from '../redux/slices/authModalSlice';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const Signup:React.FC = () => {
    const dispatch = useDispatch();

    const handleClick = (type: "login" | "signup" | "forgotPassword") => {
        dispatch(setModalState({isOpen: true, type}));
    }

    const router = useRouter();

    const [inputs, setInputs] = useState({email: '', password: '', displayName: ''});
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newUser = await createUserWithEmailAndPassword(
                inputs.email, inputs.password
            );

            if(!newUser) return;
            router.push("/problems");

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
        <form onSubmit={handleRegister}>
            <div className={`${styles["form-heading"]}`}>
                REGISTER TO <span className='text-aquamarine arena-font'>ALGO - ARENA</span>
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
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='displayName' className={styles["label"]}>Display name</label>
                    <input
                        onChange={handleInputChange}
                        type='displayName'
                        name='displayName'
                        id='displayName'
                        placeholder='Enter your display name'
                        className='input'
                    >
                    </input>
                </div>
            </div>
            <div className={`${styles["cta-container"]} flex-column`}>
                <div className={`${styles["cta-container-top"]} flex-row align-items-center justify-content-space-between`}>
                    <button>
                        REGISTER
                    </button>
                </div>
                <div className={`${styles["cta-container-bottom"]} flex-row justify-content-center`}>
                    <span>Already have an account?</span>
                    <a className='text-white cursor-pointer' onClick={() => handleClick("login")}>LOG IN</a>
                </div>
            </div>
        </form>
    )
}
export default Signup;