import React, { useState } from 'react';
import styles from './ResetPassword.module.css'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { Slide } from 'react-toastify';

const ResetPassword:React.FC = () => {
    const [email, setEmail] = useState('');
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = sendPasswordResetEmail(email);

        if (!!success) {
            toast.success("Password reset email sent successfully.", {
                position: 'top-center', autoClose: 3000, transition: Slide,
            });
        }
    }

    return (
        <form onSubmit={handleResetPassword}>
            <div className={`${styles["form-heading"]}`}>
                RESET PASSWORD
            </div>
            <div className={`${styles["form-text"]}`}>
                Forgotten your password? Enter your email address and we&apos;ll send you
                an email allowing you to reset it.
            </div>
            <div className={`${styles["form-container"]} flex-column`}>
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='email' className={styles["label"]}>Your email</label>
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email' 
                        className='input'
                    ></input>
                </div>
            </div>
            <div className={`${styles["cta-container"]} flex-column`}>
                <div className={`${styles["cta-container-top"]} flex-row align-items-center justify-content-space-between`}>
                    <button>
                        SEND RESET EMAIL
                    </button>
                </div>
            </div>
        </form>
    )
}
export default ResetPassword;