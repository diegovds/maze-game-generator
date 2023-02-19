import styles from "./ScrollTopButton.module.css";

import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position

    scrollPosition > 100 ? setShowButton(true) : setShowButton(false);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={scrollToTop}
      className={`${styles.scroll_top_button} ${
        showButton ? styles.scroll_top_button_visible : ""
      }`}
    >
      <AiOutlineArrowUp />
    </div>
  );
};

export default ScrollTopButton;
