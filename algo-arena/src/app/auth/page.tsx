import React from 'react';
import styles from './auth.module.css';
import Navbar from '../components/Navbar';
import AuthModal from '../modals/AuthModal';

type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    return (
        <div className={styles["auth-page-wrapper"]}>
            <div className={styles["auth-page"]}>
                <div className={styles["navbar"]}>
                    <Navbar/>
                </div>
                <div className={styles["auth-modal"]}>
                    <AuthModal/>
                </div>
            </div>
        </div>
    )
}
export default AuthPage;