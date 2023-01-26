import styles from "./MazeDetail.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion";
import { initial, whileInView, transition } from "../FramerMotionOptions";

const MazeDetail = ({ maze }) => {
  const [styleImg, setStyleImg] = useState("img_loading");
  const [styleImgLoading, setStyleImgLoading] = useState("img_loaded_white");

  const imgChange = () => {
    setStyleImg("img_loaded");
    setStyleImgLoading("img_loading");
  };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
    >
      <div className={styles.maze}>
        <img
          className={styleImgLoading}
          src="/null.png"
          alt="Imagem de carregamento"
        />
        <img
          className={styleImg}
          src={maze.url_image}
          alt={maze.image}
          onLoad={imgChange}
        />
        <h3>{maze.name}</h3>
        <p id="date">
          Criado em:
          <br />
          {maze.created_at}
        </p>
        <Link to={`/mazes/${maze.id}`} className="btn">
          Detalhes
        </Link>
      </div>
    </motion.div>
  );
};

export default MazeDetail;
