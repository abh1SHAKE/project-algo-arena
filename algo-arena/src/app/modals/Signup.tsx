import React from 'react';
import styles from './Signup.module.css';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    return (
        <form>
            <div className={`${styles["form-heading"]}`}>
                REGISTER TO <span className='text-aquamarine'>ALGO - ARENA</span>
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
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='displayName' className={styles["label"]}>Display name</label>
                    <input type='displayName' name='displayName' id='displayName' placeholder='Enter your display name' className='input'></input>
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
                    <a href='#' className='text-white'>LOG IN</a>
                </div>
            </div>
        </form>
    )
}
export default Signup;