import React from 'react';
import styles from './Playground.module.css';
import Split from 'react-split';
import CodeEditor from './CodeEditor/CodeEditor';
import PreferenceNavbar from './PreferenceNavbar/PreferenceNavbar';
import Testcases from './Testcases/Testcases';
import { ProblemData } from '@/types/problem';

interface PlaygroundProps {
    problemData: ProblemData;
}

const Playground: React.FC<PlaygroundProps> = ({ problemData }) => {
    return (
        <div className={`${styles["playground-wrapper"]}`}>
            <div className={`${styles["preference-navbar"]}`}>
                <PreferenceNavbar/>
            </div>
            <div className={`${styles["playground"]}`}>
                <Split 
                    className={`${styles["playground-split"]} flex-column split`}
                    direction='vertical'
                    sizes={[90, 10]}
                    minSize={[92, 92]}
                    dragInterval={1}
                    snapOffset={0}
                >
                    <div className={`${styles["code-editor"]}`}>
                        <CodeEditor boilerplateCode={problemData.boilerplate_code} />
                    </div>
                    <div className={`${styles["testcases"]}`}>
                        <Testcases testcases={problemData.problem_testcases} />
                    </div>
                </Split>
            </div>
        </div>
    )
}

export default Playground;