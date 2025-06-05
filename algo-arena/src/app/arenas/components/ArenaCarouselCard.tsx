"use client";
import React from "react";
import styles from "./ArenaCarouselCard.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getRandomProblemFromArena } from "@/app/services/arenaService";
import { toast, Slide } from "react-toastify";

interface Arena {
  arena_level: number;
  arena_name: string;
  arena_description: string;
}

interface ArenaCarouselCardProps {
  arena: Arena;
  direction: "left" | "right";
}

const ArenaCarouselCard: React.FC<ArenaCarouselCardProps> = ({
  arena,
  direction,
}) => {
  const router = useRouter();
  const arenaLevels = Array.from(
    { length: arena.arena_level },
    (_, index) => index
  );

  const getDifficultyClass = (level: number) => {
    switch (level) {
      case 1:
        return styles.easy;
      case 2:
        return styles.medium;
      case 3:
        return styles.hard;
      default:
        return "";
    }
  };

  const difficultyClass = getDifficultyClass(arena.arena_level);

  const handleEnterArena = async () => {
    const arenaKey = `arena${arena.arena_level}`;
    const randomProblem = getRandomProblemFromArena(arenaKey);

    if (randomProblem) {
      router.push(`/${arenaKey}/problem`);
    } else {
      toast.error("Error fetching problem for the arena.", {
        position: "top-center",
        autoClose: 3000,
        transition: Slide,
      });
    }
  };

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
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
      <div
        className={`${styles["carousel-top"]} position-relative flex-row align-items-center justify-content-center user-select-none`}
        onClick={handleEnterArena}
      >
        <div
          className={`${styles["arena-card-background"]} position-absolute flex-row`}
        >
          {arenaLevels.map((_, index) => (
            <div
              key={index}
              className={`${styles["arena-level"]} ${difficultyClass}`}
            ></div>
          ))}
        </div>
        <div
          className={`${styles["arena-card-foreground"]} arena-font cursor-pointer`}
        >
          ARENA
        </div>
      </div>

      <div
        className={`${styles["carousel-bottom"]}`}
        onClick={handleEnterArena}
      >
        <div
          className={`${styles["arena-level-details"]} flex-column justify-content-center align-items-center`}
        >
          <div
            className={`${styles["arena-level-title"]} cursor-pointer user-select-none`}
          >
            {arena.arena_name}
          </div>
          <div
            className={`${styles["arena-level-description"]} cursor-pointer user-select-none`}
          >
            {arena.arena_description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ArenaCarouselCard;
