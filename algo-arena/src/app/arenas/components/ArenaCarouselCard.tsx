import React from 'react';
import styles from './ArenaCarouselCard.module.css'

interface Arena {
    arena_level: number;
    arena_name: string;
    arena_description: string;
}

interface ArenaCarouselCardProps {
    arena: Arena;
}

const ArenaCarouselCard:React.FC<ArenaCarouselCardProps> = ({ arena }) => {

    const arenaLevels = Array.from({ length: arena.arena_level }, (_, index) => index);

    const getDifficultyClass = (level: number) => {
        switch(level) {
            case 1:
                return styles.easy;
            case 2:
                return styles.medium;
            case 3:
                return styles.hard;
            default:
                return '';
        }
    };

    const difficultyClass = getDifficultyClass(arena.arena_level);
    
    return (
        <div className={`${styles["arena-carousel-card-wrapper"]} position-relative flex-column align-items-center justify-content-center`}>
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
        </div>
    )
}
export default ArenaCarouselCard;