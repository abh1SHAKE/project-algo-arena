import React, { useState } from 'react';
import styles from './Testcases.module.css';

interface Testcase {
    input: string;
    output: string;
}

interface TestcasesProps {
    testcases: Testcase[];
    isExpanded?: boolean;
    onTabClick?: () => void;
}

const Testcases: React.FC<TestcasesProps> = ({ testcases, onTabClick, isExpanded }) => {
    const [activeTestcase, setActiveTestcase] = useState(0);

    const formatTestcaseData = (data: string) => {
        return data.replace(/\\n/g, '\n');
    };

    const parseInput = (input: string) => {
        const lines = formatTestcaseData(input).split('\n');
        return lines.map((line, index) => ({
            label: `Input ${index + 1}:`,
            value: line.trim()
        }));
    };

    return (
        <div className={`${styles["testcases-wrapper"]} position-relative`}>
            <div className={`${styles["top-section"]}`}>
                <div className={`${styles["header-section"]} flex-row justify-content-space-between`}>
                    <div className={`${styles["cta-container"]} gap-12 flex-row`}>
                        <div className={`${styles["run-cta"]} flex-row cursor-pointer`}>RUN</div>
                        <div className={`${styles["submit-cta"]} flex-row cursor-pointer`}>SUBMIT</div>
                    </div>
                    <div className={`${styles["tab"]} flex-row align-items-center gap-4 cursor-pointer`} onClick={onTabClick}>
                        TESTCASES
                        <div className={`${styles["chevron-icon"]} flex-row`}
                            style={{
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={`${styles["testcases-tab-section"]} flex-row gap-24`}>
                    {testcases.map((_, index) => (
                        <div 
                            key={index}
                            className={`${styles["testcase-tab"]} ${activeTestcase === index ? styles["active"] : ""}`}
                            onClick={() => setActiveTestcase(index)}
                        >
                            CASE {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            {testcases.length > 0 && testcases[activeTestcase] && (
                <>
                    {parseInput(testcases[activeTestcase].input).map((inputItem, index) => (
                        <div key={index} className={`${styles["input-output-wrapper"]}`}>
                            <div className={`${styles["io-container"]} flex-column gap-8`}>
                                <div className={`${styles["label"]}`}>{inputItem.label}</div>
                                <div className={`${styles["container"]}`}>
                                    {inputItem.value}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className={`${styles["input-output-wrapper"]}`}>
                        <div className={`${styles["io-container"]} flex-column gap-8`}>
                            <div className={`${styles["label"]}`}>Expected Output:</div>
                            <div className={`${styles["container"]}`}>
                                {formatTestcaseData(testcases[activeTestcase].output)}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {testcases.length === 0 && (
                <div className={`${styles["input-output-wrapper"]}`}>
                    <div className={`${styles["io-container"]} flex-column gap-8`}>
                        <div>No testcases available</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Testcases;