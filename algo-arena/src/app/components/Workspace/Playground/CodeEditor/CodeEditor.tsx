import React from 'react';
import Editor from '@monaco-editor/react';
import styles from './CodeEditor.module.css';

interface CodeEditorProps {
    boilerplateCode: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ boilerplateCode }) => {
    const formatCode = (code: string) => {
        return code.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    };

    const defaultCode = boilerplateCode ? formatCode(boilerplateCode) : `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

    return (
        <div className={`${styles["code-editor-wrapper"]}`}>
            <Editor
                height="100%"
                defaultLanguage="java"
                defaultValue={defaultCode}
                theme="vs-dark"
                options={{
                    fontSize: 16,
                    minimap: { enabled: false },
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;