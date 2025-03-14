import React from 'react';
import styles from './auth.module.css';
import Navbar from '../components/Navbar';

type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    return (
        <div className={styles["auth-page-wrapper"]}>
            <div className={styles["auth-page"]}>
                <div className={styles["navbar"]}>
                    <Navbar/>
                </div>
            </div>
        </div>
    )
}
export default AuthPage;