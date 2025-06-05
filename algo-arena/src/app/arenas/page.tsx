import React from "react";
import styles from "./page.module.css";
import Navbar from "../components/Navbar/Navbar";
import ArenaCarousel from "./components/ArenaCarousel";
import RequireAuth from "../components/RequireAuth";

const ArenaPage: React.FC = () => {
  return (
    <RequireAuth>
      <div className={`${styles["arena-page-wrapper"]}`}>
        <div className={styles["navbar"]}>
          <Navbar />
        </div>
        <div className={`${styles["carousel-wrapper"]}`}>
          <ArenaCarousel />
        </div>
      </div>
    </RequireAuth>
  );
};
export default ArenaPage;
