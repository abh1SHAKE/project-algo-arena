'use client'
import React from 'react';
import styles from './LandingVideo.module.css';

type LandingVideoProps = {
    videoSource: string;
}

const LandingVideo:React.FC<LandingVideoProps> = ({videoSource}) => {
    return (
        <div className={`${styles["video-container-wrapper"]}`}>
            <div className={`${styles["video-container"]}`}>
                <video
                    autoPlay
                    loop
                    muted
                >
                    <source src={videoSource} type='video/mp4'></source>
                </video>
            </div>
        </div>
    )
}
export default LandingVideo;