import styles from "./MazeDelete.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion";
import { initial, whileInView, transition } from "../FramerMotionOptions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MazeDelete = ({ maze, getMazeDelete, loadingDelete = false }) => {
  const [styleImg, setStyleImg] = useState("img_loading");
  const [skeleton, setSkeleton] = useState(true);

  const deleteMaze = () => {
    getMazeDelete(maze);
  };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
    >
      <div className={styles.maze}>
        {skeleton && <Skeleton width={`100%`} />}
        <img
          className={styleImg}
          src={maze.url_image}
          alt={maze.image}
          onLoad={() => {
            setSkeleton(false);
            setStyleImg("img_loaded");
          }}
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
