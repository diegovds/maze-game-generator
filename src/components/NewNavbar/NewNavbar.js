import styles from "./NewNavbar.module.css";
import { HiSearch } from "react-icons/hi";

import { IoMdReorder } from "react-icons/io";

import { useState } from "react";

const NewNavbar = () => {
  const [showLinks, setShowLiks] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <div className={styles.leftSide}>
          <div className={styles.links} id={showLinks ? styles.hidden : ""}>
            <a href="/">Home</a>
            <a href="/">Feedback</a>
            <a href="/">About Us</a>
            <a href="/">Contact</a>
          </div>
          <button onClick={() => setShowLiks(!showLinks)}>
            <IoMdReorder />
          </button>
        </div>
        <div className={styles.rightSide}>
          <input type="search" placeholder="Search" />
          <button>
            <HiSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
