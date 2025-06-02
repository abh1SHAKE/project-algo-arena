import React from 'react';
import styles from './page.module.css'
import RequireAuth from '@/app/components/RequireAuth';
import Navbar from '@/app/components/Navbar';

const ProblemPage:React.FC = () => {
    return (
        <RequireAuth>
            <div className={`${styles["problem-page-wrapper"]}`}>
                <div className={`${styles["navbar"]}`}>
                    <Navbar/>
                </div>
            </div>
        </RequireAuth>
    )
}
export default ProblemPage;