import styles from "./MazeDelete.module.css";

import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MazeDelete = ({ maze, getMazeDelete, loadingDelete = false }) => {
  const ref = useRef();
  const isVisible = useInView(ref);

  const [styleImg, setStyleImg] = useState("img_loading");
  const [skeleton, setSkeleton] = useState(true);

  const deleteMaze = () => {
    getMazeDelete(maze);
  };

  return (
    <div className={styles.flip_card} ref={ref}>
      <div
        className={`${styles.flip_card_inner} ${isVisible ? styles.flip : ""}`}
      >
        <div className={styles.flip_card_front}></div>
        <div className={styles.flip_card_back}>
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
      </div>
    </div>
  );
};

export default MazeDelete;
