'use client'
import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import styles from './Workspace.module.css';
import ProblemDetails from './ProblemDetails/ProblemDetails';

const Workspace:React.FC = () => {
    const [minSize, setMinSize] = useState<[number, number]>([0,0]);

    useEffect(() => {
        const updateMinSizes = () => {
            const width = window.innerWidth;
            const leftMin = width * 0.30;
            const rightMin = width * 0.50;
            setMinSize([leftMin, rightMin]);
        };

        updateMinSizes();
        window.addEventListener('resize', updateMinSizes);
        return () => window.removeEventListener('resize', updateMinSizes);
    },[]);

    return (
        <Split 
            className={`${styles["workspace-container"]} flex-row split`}
            sizes={[35, 65]}
            minSize={minSize}
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