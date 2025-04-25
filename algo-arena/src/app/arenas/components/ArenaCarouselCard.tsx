'use client'
import React from 'react';
import styles from './ArenaCarouselCard.module.css'
import { motion } from 'framer-motion';

interface Arena {
    arena_level: number;
    arena_name: string;
    arena_description: string;
}

interface ArenaCarouselCardProps {
    arena: Arena;
    direction: 'left' | 'right';
}

const ArenaCarouselCard: React.FC<ArenaCarouselCardProps> = ({ arena, direction }) => {
    const arenaLevels = Array.from({ length: arena.arena_level }, (_, index) => index);

    const getDifficultyClass = (level: number) => {
        switch(level) {
            case 1: return styles.easy;
            case 2: return styles.medium;
            case 3: return styles.hard;
            default: return '';
        }
    };

    const difficultyClass = getDifficultyClass(arena.arena_level);

    const variants = {
        enter: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.2 },
        },
        exit: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? -100 : 100,
            opacity: 0,
            transition: { duration: 0.2 },
        }),
    };

    return (
        <motion.div
            className={`${styles["arena-carousel-card-wrapper"]} position-relative flex-column align-items-center justify-content-center`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
        >
            <div className={`${styles["carousel-top"]} position-relative flex-row align-items-center justify-content-center`}>
                <div className={`${styles["arena-card-background"]} position-absolute flex-row`}>
                    {arenaLevels.map((_, index) => (
                        <div key={index} className={`${styles["arena-level"]} ${difficultyClass}`}></div>
                    ))}
                </div>
                <div className={`${styles["arena-card-foreground"]} arena-font`}>
                    ARENA 
                </div>
            </div>

            <div className={`${styles["carousel-bottom"]}`}>
                <div className={`${styles["arena-level-details"]} flex-column justify-content-center align-items-center`}>
                    <div className={`${styles["arena-level-title"]}`}>
                        {arena.arena_name}
                    </div>
                    <div className={`${styles["arena-level-description"]}`}>
                        {arena.arena_description}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
export default ArenaCarouselCard;
