'use client'
import React from 'react';
import styles from './page.module.css';
import Navbar from './components/Navbar/Navbar';
import TextScramble from './components/TextScramble/TextScramble';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import AuthModal from './modals/AuthModal';
import LandingVideo from './components/LandingVideo/LandingVideo';
import RequireGuest from './components/RequireGuest';

const AuthPage:React.FC = () => {
    const authModal = useSelector((state: RootState) => state.authModal);
    return (
        <RequireGuest>
            <div className={styles["auth-page-wrapper"]}>
                <div className={styles["auth-page"]}>
                    <div className={styles["navbar"]}>
                        <Navbar/>
                    </div>
                    <div className={styles["text-scramble"]}>
                        <TextScramble/>
                    </div>
                    <div className={styles["auth-modal"]}>
                        {authModal.isOpen && <AuthModal />}
                    </div>
                    <div className={styles["landing-video"]}>
                        <LandingVideo videoSource='/assets/watch-dogs-edit.mp4'/>
                    </div>
                </div>
            </div>
        </RequireGuest>
    )
}
export default AuthPage;