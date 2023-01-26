import styles from "./MazeDelete.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion";
import { offscreen, onscreen, viewport } from "../FramerMotionOptions";

const MazeDelete = ({ maze, getMazeDelete, loadingDelete = false }) => {
  const [styleImg, setStyleImg] = useState("img_loading");
  const [styleImgLoading, setStyleImgLoading] = useState("img_loaded_white");

  const imgChange = () => {
    setStyleImg("img_loaded");
    setStyleImgLoading("img_loading");
  };

  const deleteMaze = () => {
    getMazeDelete(maze);
  };

  return (
    <motion.div initial={offscreen} whileInView={onscreen} viewport={viewport}>
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
        {!loadingDelete && (
          <button
            onClick={() => deleteMaze()}
            className="btn btn-outline btn-danger"
          >
            Excluir
          </button>
        )}
        {loadingDelete && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MazeDelete;
