import styles from "./MazeDetail.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion";
import { cardAnimate, imageAnimate, textAnimate } from "../FramerMotionOptions";

const MazeDetail = ({ maze }) => {
  const [styleImg, setStyleImg] = useState("img_loading");
  const [styleImgLoading, setStyleImgLoading] = useState("img_loaded_white");

  const imgChange = () => {
    setStyleImg("img_loaded");
    setStyleImgLoading("img_loading");
  };

  return (
    <motion.div
      className={styles.maze}
      variants={cardAnimate}
      initial="hidden"
      whileInView="visible"
    >
      <div className={styles.image}>
        <img
          className={styleImgLoading}
          src="/null.png"
          alt="Imagem de carregamento"
        />
      </div>
      <motion.div className={styles.image} variants={imageAnimate}>
        <img
          className={styleImg}
          src={maze.url_image}
          alt={maze.image}
          onLoad={imgChange}
        />
      </motion.div>
      <motion.div className={styles.data} variants={textAnimate}>
        <h3>{maze.name}</h3>
        <p id="date">
          Criado em:
          <br />
          {maze.created_at}
        </p>
        <Link to={`/mazes/${maze.id}`} className="btn">
          Detalhes
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MazeDetail;
