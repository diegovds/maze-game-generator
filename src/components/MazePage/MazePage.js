import styles from "./MazePage.module.css";

import api from "../../services/api";

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

const MazePage = ({ maze, loadGame, errorReturn, notify }) => {
  const [loading, setLoading] = useState(false);
  const [styleImg, setStyleImg] = useState("img_loading");
  const [styleImgLoading, setStyleImgLoading] = useState("img_loaded_white");
  const isMobile = useMediaQuery("(max-width: 1115px)");

  const goToMaze = async (width) => {
    if (width) {
      notify("no-execute");
    } else {
      setLoading(true);
      const dataMaze = new FormData();
      const execs = maze.executions + 1;

      dataMaze.append("executions", execs);

      api
        .put("/mazes/" + maze.id, dataMaze)

        .then((data) => {
          loadGame();

          //window.open("https://myblocklymaze-game.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels) + "&url_image=" +maze.url_image + "&reset=1", '_blank');
        })
        .catch((e) => {
          String(e.response.data.message).includes("Maze não encontrado")
            ? errorReturn("Jogo não encontrado 😢")
            : errorReturn("Ocorreu um erro, por favor tente mais tarde 👎");
        });
    }
  };

  const clipboard = () => {
    copy(window.location.href);
  };

  const imgChange = () => {
    setStyleImg("img_loaded");
    setStyleImgLoading("img_loading");
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
