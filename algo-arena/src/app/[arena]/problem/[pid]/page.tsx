import React from 'react';
import styles from './page.module.css'
import RequireAuth from '@/app/components/RequireAuth';
import Navbar from '@/app/components/Navbar/Navbar';
import Workspace from '@/app/components/Workspace/Workspace';

const ProblemPage:React.FC = () => {
    return (
        <RequireAuth>
            <div className={`${styles["problem-page-wrapper"]}`}>
                <div className={`${styles["navbar"]}`}>
                    <Navbar problemPage={true}/>
                </div>
                <div className={`${styles["workspace-container"]}`}>
                    <Workspace/>
                </div>
            </div>
        </RequireAuth>
    )
}
export default ProblemPage;