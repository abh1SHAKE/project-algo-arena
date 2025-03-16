import React from 'react';
import styles from './ResetPassword.module.css'

type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    return (
        <form>
            <div className={`${styles["form-heading"]}`}>
                RESET PASSWORD
            </div>
            <div className={`${styles["form-text"]}`}>
                Forgotten your password? Enter your email address and we'll send you
                an email allowing you to reset it.
            </div>
            <div className={`${styles["form-container"]} flex-column`}>
                <div className={`${styles["form-field"]} flex-column`}>
                    <label htmlFor='email' className={styles["label"]}>Your email</label>
                    <input type='email' name='email' id='email' placeholder='Enter your email' className='input'></input>
                </div>
            </div>
            <div className={`${styles["cta-container"]} flex-column`}>
                <div className={`${styles["cta-container-top"]} flex-row align-items-center justify-content-space-between`}>
                    <button>
                        LOGIN
                    </button>
                </div>
            </div>
        </form>
    )
}
export default ResetPassword;