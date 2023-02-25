import styles from "./MazePage.module.css";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import copy from "copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";

import { motion } from "framer-motion";
import {
  cardAnimate,
  imageAnimate,
  textAnimate,
  cardAnimateText,
} from "../../components/FramerMotionOptions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAxios } from "../../hooks/useAxios";

const MazePage = ({ maze, loadGame, errorReturn, notify }) => {
  const [loading, setLoading] = useState(false);
  const [styleImg, setStyleImg] = useState("img_loading");
  const [skeleton, setSkeleton] = useState(true);
  const isMobile = useMediaQuery("(max-width: 1115px)");
  const { updateAMaze } = useAxios();

  const goToMaze = async (width) => {
    if (width) {
      notify("no-execute");
    } else {
      setLoading(true);

      try {
        let ret = await updateAMaze(maze);
        if (ret.data.data) {
          setLoading(false);
          loadGame();

          //window.open(`https://myblocklymaze-game.vercel.app/maze.html?levels=${maze.levels}&url_image=${maze.url_image}&reset=1`, '_blank');
        }
      } catch (e) {
        setLoading(false);
        errorReturn(e);
      }
    }
  };

  const clipboard = () => {
    copy(window.location.href);
  };

  return (
    <main className={styles.main}>
      <motion.div
        className={styles.container}
        variants={cardAnimate}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.img} variants={imageAnimate}>
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
        </motion.div>
        <motion.div className={styles.informations} variants={cardAnimateText}>
          <motion.h2 variants={textAnimate}>
            {maze.name} (Cód. {maze.code})
          </motion.h2>
          <motion.p className={styles.p_data} variants={textAnimate}>
            Criado por {maze.username} em {maze.created_at}
          </motion.p>
          <motion.p className={styles.p_data} variants={textAnimate}>
            Quantidade de níveis: {JSON.parse(maze.levels).length}
          </motion.p>
          <motion.p className={styles.p_data} variants={textAnimate}>
            Total de execuções: {maze.executions}
          </motion.p>
          {/*<p className={styles.p_data}>Taxa de conclusão: {((maze.conclusions * 100) / maze.executions).toFixed(2)}%</p>*/}
          <motion.p className={styles.p_a} variants={textAnimate}>
            Ao clicar no botão abaixo a reprodução do Maze Game será iniciada.
          </motion.p>
          {!loading && (
            <motion.button
              onClick={() => {
                goToMaze(isMobile);
              }}
              className="btn"
              variants={textAnimate}
            >
              Iniciar Maze Game
            </motion.button>
          )}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          <motion.button
            onClick={() => {
              clipboard();
              notify("copy");
            }}
            className="btn"
            variants={textAnimate}
            id={styles.copy}
          >
            Copiar link
            <FaRegCopy />
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default MazePage;
