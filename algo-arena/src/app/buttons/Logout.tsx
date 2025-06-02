import React from 'react';
import { auth } from '../firebase/firebase';
import styles from './Logout.module.css'
import { useSignOut } from 'react-firebase-hooks/auth';

const Logout:React.FC = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const handleLogout = () => {
        signOut();
    }

    return (
        <div className={`${styles["logout-cta"]} flex-row cursor-pointer`} onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 22 22">
	            <path fill="currentColor" d="M17 1v1h1v4h-1V5h-1V3H6v16h10v-2h1v-1h1v4h-1v1H5v-1H4V2h1V1zm-4 5h2v1h1v1h1v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1h-2v-2h1v-1h1v-1H8v-2h7V9h-1V8h-1z" />
            </svg>
        </div>
    )
}
export default Logout;