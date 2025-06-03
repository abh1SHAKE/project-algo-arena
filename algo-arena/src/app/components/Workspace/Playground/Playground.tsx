import React from 'react';
import styles from './Playground.module.css';
import Split from 'react-split';
import PreferenceNavbar from './PreferenceNavbar/PreferenceNavbar';

const Playground:React.FC = () => {
    return (
        <div className={`${styles["playground-wrapper"]}`}>
            <div className={`${styles["preference-navbar"]}`}>
                <PreferenceNavbar/>
            </div>
            <div className={`${styles["playground"]}`}>
                <Split 
                    className={`${styles["playground-split"]} flex-column split`}
                    direction='vertical'
                >
                    <div className={`${styles["code-editor"]}`}>
                        SECTION1
                    </div>
                    <div className={`${styles["testcases"]}`}>
                        SECTION2
                    </div>
                </Split>
            </div>
        </div>
    )
}
export default Playground;