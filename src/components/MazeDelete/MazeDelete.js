import styles from "./MazeDelete.module.css";

import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useElementSize } from "usehooks-ts";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { LazyLoadImage } from "react-lazy-load-image-component";

const MazeDelete = ({
  maze,
  getMazeDelete,
  loadingDelete = false,
  deleteDisabled,
}) => {
  const ref = useRef();
  const isVisible = useInView(ref);

  const [refFlipCardBack, { height }] = useElementSize();

  const [styleImg, setStyleImg] = useState("img_loading");
  const [skeleton, setSkeleton] = useState(undefined);

  const deleteMaze = () => {
    getMazeDelete(maze);
  };

  return (
    <div className={styles.flip_card} ref={ref} style={{ height: height }}>
      <div
        className={`${styles.flip_card_inner} ${isVisible ? styles.flip : ""}`}
      >
        <div
          className={styles.flip_card_front}
          style={{ height: height }}
        ></div>
        <div className={styles.flip_card_back} ref={refFlipCardBack}>
          {skeleton && <Skeleton width={`100%`} />}
          <LazyLoadImage
            className={styleImg}
            src={maze.url_image}
            alt={maze.image}
            beforeLoad={() => {
              setSkeleton(true);
            }}
            afterLoad={() => {
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
          {!loadingDelete && !deleteDisabled && (
            <button
              onClick={() => deleteMaze()}
              className="btn btn-outline btn-danger"
            >
              Excluir
            </button>
          )}
          {loadingDelete && (
            <button
              className="btn"
              style={{ backgroundColor: "#f00" }}
              disabled
            >
              Aguarde...
            </button>
          )}
          {deleteDisabled && (
            <button className="btn" disabled>
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MazeDelete;
