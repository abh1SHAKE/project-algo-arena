"use client";
import React from "react";
import ArenaCarouselCard from "./ArenaCarouselCard";
import styles from "./ArenaCarousel.module.css";
import { useState } from "react";

interface Arena {
  arena_level: number;
  arena_name: string;
  arena_description: string;
}

const ArenaCarousel: React.FC = () => {
  const arenas: Arena[] = [
    {
      arena_level: 1,
      arena_name: "WARM-UP PIT",
      arena_description:
        "Welcome to Arena I — where semicolons are friendly, bugs are shy, and your keyboard still likes you. Think of it as a coding smoothie: tasty, healthy, and doesn't bite back. Great for stretching those logic muscles without pulling a brain-hamstring.",
    },
    {
      arena_level: 2,
      arena_name: "LOGIC-LABYRINTH",
      arena_description:
        "Now you're in the mid-tier maze. Arena II turns the dial up — more edge cases, sneakier constraints, and the occasional 'Why is this failing test case ruining my day?' It's the sweet spot where newbies feel bold and veterans feel... slightly nervous.",
    },
    {
      arena_level: 3,
      arena_name: "THE BOSS BATTLE",
      arena_description:
        "This is it. Arena III. Where recursion meets regret, and time complexity is your final boss. Only the brave, caffeinated, and slightly unhinged enter here. May your stack never overflow and your code always compile on the first try (lol)",
    },
  ];

  const [currentArenaIndex, setCurrentArenaIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goBack = () => {
    setDirection("left");
    setCurrentArenaIndex((prevIndex) => {
      return prevIndex === 0 ? arenas.length - 1 : prevIndex - 1;
    });
  };

  const goForward = () => {
    setDirection("right");
    setCurrentArenaIndex((prevIndex) => {
      return prevIndex === arenas.length - 1 ? 0 : prevIndex + 1;
    });
  };

  return (
    <div
      className={`${styles["arena-carousel-wrapper"]} flex-row justify-content-center align-items-center`}
    >
      <div
        onClick={goBack}
        className={`${styles["carousel-button"]} cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"
          />
        </svg>
      </div>
      <div className={`${styles["carousel-container"]}`}>
        <ArenaCarouselCard
          key={arenas[currentArenaIndex].arena_level}
          arena={arenas[currentArenaIndex]}
          direction={direction}
        />
      </div>
      <div
        onClick={goForward}
        className={`${styles["carousel-button"]} cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
          />
        </svg>
      </div>
    </div>
  );
};
export default ArenaCarousel;
