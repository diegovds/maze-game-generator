import styles from "./MazeDetail.module.css";

import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MazeDetail = ({ maze }) => {
  const ref = useRef();
  const isVisible = useInView(ref);

  const [styleImg, setStyleImg] = useState("img_loading");
  const [skeleton, setSkeleton] = useState(true);

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
        </div>
      </div>
    </div>
  );
};

export default MazeDetail;
