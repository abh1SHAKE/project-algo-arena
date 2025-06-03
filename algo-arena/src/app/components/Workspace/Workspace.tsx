'use client'
import React from 'react';
import Split from 'react-split';
import styles from './Workspace.module.css';
import ProblemDetails from './ProblemDetails/ProblemDetails';

const Workspace:React.FC = () => {
    return (
        <Split 
            className={`${styles["workspace-container"]} flex-row split`}
            sizes={[40, 60]}
            minSize={[450, 750]}
            dragInterval={1}
            snapOffset={0}
        >
            <div className={`${styles["problem-details"]}`}>
                <ProblemDetails/>
            </div>
            <div className={`${styles["code-editor-section"]}`}>

            </div>
        </Split>
    )
}
export default Workspace;