import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';

const Timer:React.FC = () => {
    const [showTimer, setShowTimer] = useState<boolean>(false);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTime(prev => prev+1);
            },1000)
        }
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setIsRunning(false);
    }

    const togglePause = () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    const resetTimer = () => {
        stopTimer();
        setTime(0);
        setShowTimer(false);
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    },[]);

    const formatTime = (seconds: number): string => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }

    return (
        <div className={`${styles["timer-container"]} flex-row align-items-center justify-content-center`}>
            {showTimer ? (
                <div className={`${styles["timer-active-state"]} flex-row gap-8`}>
                    <div className={`${styles["pause-icon"]} flex-row cursor-pointer`} onClick={togglePause}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
	                        <path fill="currentColor" d="M23 2v20h-1v1h-7v-1h-1V2h1V1h7v1zM9 2h1v20H9v1H2v-1H1V2h1V1h7z" />
                        </svg>
                    </div>
                    <div className={`${styles["timer"]} flex-row text-aquamarine`}>
                        {formatTime(time)}
                    </div>
                    <div className={`${styles["reset-timer-icon"]} flex-row cursor-pointer`} onClick={resetTimer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15">
                            <path fill="currentColor" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27" />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className={`${styles["timer-inactive-state"]} ${showTimer ? styles['expanded'] : ''} flex-row gap-4 cursor-pointer`}
                    onClick={() => {
                        setShowTimer(true);
                        startTimer();
                    }}
                >
                    <div className={`${styles["timer-icon"]} flex-row`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 56 56">
	                        <path fill="currentColor" d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.828-23.906-23.883-23.906c-1.242 0-1.851.75-1.851 1.968v9.094c0 1.008.68 1.828 1.71 1.828c1.032 0 1.735-.82 1.735-1.828V8.148C39.93 8.968 47.898 17.5 47.898 28A19.84 19.84 0 0 1 28 47.922c-11.063 0-19.945-8.86-19.922-19.922c.023-4.922 1.781-9.398 4.711-12.844c.726-.914.773-2.015 0-2.836c-.774-.843-2.086-.773-2.93.282C6.273 16.773 4.094 22.164 4.094 28c0 13.078 10.828 23.906 23.906 23.906m3.75-20.297c1.851-1.922 1.477-4.547-.75-6.093l-12.4-8.649c-1.171-.82-2.39.399-1.57 1.57l8.649 12.399c1.547 2.227 4.171 2.625 6.07.773" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Timer;
