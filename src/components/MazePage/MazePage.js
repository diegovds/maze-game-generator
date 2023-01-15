import styles from "./MazePage.module.css";

import api from "../../services/api";

import { useState } from "react";
import useMedia from "use-media";

import copy from "copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";

import { motion } from "framer-motion";
import { initial, whileInView, transition } from "../FramerMotionOptions";

const MazePage = ({ maze, childToParent, childToParent2, childToParent3 }) => {
  const [loading, setLoading] = useState(false);
  const [styleImg, setStyleImg] = useState("img_loading");
  const [styleImgLoading, setStyleImgLoading] = useState("img_loaded_white");
  const isMobile = useMedia({ maxWidth: 1115 });

  const goToMaze = async (width) => {
    if (width) {
      childToParent3("no-execute");
    } else {
      setLoading(true);
      const dataMaze = new FormData();
      const execs = maze.executions + 1;

      dataMaze.append("executions", execs);

      api
        .put("/mazes/" + maze.id, dataMaze)

        .then((data) => {
          childToParent();

          //window.open("https://myblocklymaze-game.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels) + "&url_image=" +maze.url_image + "&reset=1", '_blank');
        })
        .catch((e) => {
          String(e.response.data.message).includes("Maze não encontrado")
            ? childToParent2("Jogo não encontrado 😢")
            : childToParent2("Ocorreu um erro, por favor tente mais tarde 👎");
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
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
    >
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.img}>
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
          </div>
          <div className={styles.informations}>
            <h2>
              {maze.name} (Cód. {maze.code})
            </h2>
            <p className={styles.p_data}>
              Criado pelo(a) usuário(a) {maze.username}
            </p>
            <p className={styles.p_data}>Publicado em {maze.created_at}</p>
            <p className={styles.p_data}>
              Quantidade de níveis: {JSON.parse(maze.levels).length}
            </p>
            <p className={styles.p_data}>
              Total de execuções: {maze.executions}
            </p>
            {/*<p className={styles.p_data}>Taxa de conclusão: {((maze.conclusions * 100) / maze.executions).toFixed(2)}%</p>*/}
            <p className={styles.p_a}>
            Ao clicar no botão abaixo a reprodução<br />do Maze Game será iniciada.
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
                childToParent3("copy");
              }}
              className="btn"
              id={styles.copy}
            >
              Copiar link
              <FaRegCopy />
            </button>
            {/**<a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels)}>Ir para o Maze Game</a>
                    <Link to="/" className="btn btn-dark">Voltar</Link>*/}
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default MazePage;
