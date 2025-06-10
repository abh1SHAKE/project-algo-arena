'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './Tooltip.module.css';

type TooltipProps = {
    text: string
    children: ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip:React.FC<TooltipProps> = ({children, text, position = 'bottom'}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            console.log("TOOLTIP VISIBLE");
        } else {
            console.log("TOOLTIP NOT VISIBLE");
        }
    },[visible]);
    return (
        <div 
            className={`${styles["tooltip-wrapper"]}`}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <div className={`${styles["tooltip"]} ${styles[position]}`}>{text}</div>}
        </div>
    )
}
export default Tooltip;