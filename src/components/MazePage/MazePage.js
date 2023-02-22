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
          loadGame();

          //window.open("https://myblocklymaze-game.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels) + "&url_image=" +maze.url_image + "&reset=1", '_blank');
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
        <motion.div className={styles.informations} variants={textAnimate}>
          <h2>
            {maze.name} (Cód. {maze.code})
          </h2>
          <p className={styles.p_data}>
            Criado por {maze.username} em {maze.created_at}
          </p>
          <p className={styles.p_data}>
            Quantidade de níveis: {JSON.parse(maze.levels).length}
          </p>
          <p className={styles.p_data}>Total de execuções: {maze.executions}</p>
          {/*<p className={styles.p_data}>Taxa de conclusão: {((maze.conclusions * 100) / maze.executions).toFixed(2)}%</p>*/}
          <p className={styles.p_a}>
            Ao clicar no botão abaixo a reprodução do Maze Game será iniciada.
          </p>
          {!loading && (
            <button
              onClick={() => {
                goToMaze(isMobile);
              }}
              className="btn"
            >
              Iniciar Maze Game
            </button>
          )}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          <button
            onClick={() => {
              clipboard();
              notify("copy");
            }}
            className="btn"
            id={styles.copy}
          >
            Copiar link
            <FaRegCopy />
          </button>
          {/**<a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels)}>Ir para o Maze Game</a>
                    <Link to="/" className="btn btn-dark">Voltar</Link>*/}
        </motion.div>
      </motion.div>
    </main>
  );
};

export default MazePage;
