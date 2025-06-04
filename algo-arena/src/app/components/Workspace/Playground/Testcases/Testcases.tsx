import React from 'react';
import styles from './Testcases.module.css';

const Testcases:React.FC = () => {
    return (
        <div className={`${styles["testcases-wrapper"]} position-relative`}>
            <div className={`${styles["top-section"]}`}>
                <div className={`${styles["header-section"]} flex-row justify-content-space-between`}>
                    <div className={`${styles["cta-container"]} gap-12 flex-row`}>
                        <div className={`${styles["run-cta"]} flex-row cursor-pointer`}>RUN</div>
                        <div className={`${styles["submit-cta"]} flex-row cursor-pointer`}>SUBMIT</div>
                    </div>
                    <div className={`${styles["tab"]} flex-row align-items-center gap-4 cursor-pointer`}>
                        TESTCASES
                        <div className='flex-row'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
	                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={`${styles["testcases-tab-section"]} flex-row gap-24`}>
                    <div className={`${styles["testcase-tab"]}`}>
                        CASE 1
                    </div>
                    <div className={`${styles["testcase-tab"]}`}>
                        CASE 2
                    </div>
                    <div className={`${styles["testcase-tab"]}`}>
                        CASE 3
                    </div>
                </div>
            </div>

            <div className={`${styles["input-output-wrapper"]}`}>
                <div className={`${styles["io-container"]} flex-column gap-8`}>
                    <div>Input: </div>
                    <div className={`${styles["container"]}`}>
                        {`nums = [2,3,1,1,4]`}
                    </div>
                </div>
            </div>

            <div className={`${styles["input-output-wrapper"]}`}>
                <div className={`${styles["io-container"]} flex-column gap-8`}>
                    <div>Input: </div>
                    <div className={`${styles["container"]}`}>
                        {`nums = [2,3,1,1,4]`}
                    </div>
                </div>
            </div>

            <div className={`${styles["input-output-wrapper"]}`}>
                <div className={`${styles["io-container"]} flex-column gap-8`}>
                    <div>Input: </div>
                    <div className={`${styles["container"]}`}>
                        {`nums = [2,3,1,1,4]`}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Testcases;