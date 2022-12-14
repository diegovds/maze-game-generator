import styles from "./MazePage.module.css";

import api from "../../services/api";

import { useEffect, useRef, useState } from "react";

import copy from "copy-to-clipboard";

import ScrollReveal from "scrollreveal";
import { ScrollRevealOptions } from "../Scroll/ScrollRevealOptions";

const MazePage = ({ maze, childToParent, childToParent2, childToParent3 }) => {
  const [loading, setLoading] = useState(undefined);
  const elementRef = useRef();

  useEffect(() => {
    const divElement = elementRef.current;
    ScrollReveal().reveal(divElement, ScrollRevealOptions);
  }, []);

  const goToMaze = async () => {
    const dataMaze = new FormData();
    const execs = maze.executions + 1;

    dataMaze.append("executions", execs);

    api
      .put("/mazes/" + maze.id, dataMaze)

      .then((data) => {
        if (data.data.error) {
          childToParent2();
        } else {
          childToParent();
        }

        //window.open("https://myblocklymaze-game.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels) + "&url_image=" +maze.url_image + "&reset=1", '_blank');
      })
      .catch(() => {
        //setError(error)
        childToParent2();
      });
  };

  const clipboard = () => {
    copy(window.location.href);
  };

  return (
    <div className="load-hidden">
      <div ref={elementRef}>
        <div className={styles.maze}>
          <h2>
            {maze.name} (Cód. {maze.code})
          </h2>
          <img src={maze.url_image} alt={maze.image} />
          <p className={styles.p_data}>
            Criado em {maze.created_at} pelo usuário {maze.user.username}
          </p>
          <p className={styles.p_data}>
            Quantidade de níveis: {JSON.parse(maze.levels).length}
          </p>
          <p className={styles.p_data}>Total de execuções: {maze.executions}</p>
          {/*<p className={styles.p_data}>Taxa de conclusão: {((maze.conclusions * 100) / maze.executions).toFixed(2)}%</p>*/}
          <p className={styles.p_a}>
            Ao clicar no botão abaixo você será redirecionado para a página do
            Maze Game.
          </p>
          {!loading && (
            <button
              onClick={() => {
                goToMaze();
                setLoading(true);
              }}
              className="btn"
            >
              Ir para o Maze Game
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
              childToParent3();
            }}
            className="btn"
            style={{ marginLeft: 8 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              style={{ width: 18, paddingTop: 1 }}
            >
              <path
                style={{ fill: "#fff" }}
                d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"
              />
            </svg>
          </button>
          {/**<a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels)}>Ir para o Maze Game</a>
                    <Link to="/" className="btn btn-dark">Voltar</Link>*/}
        </div>
      </div>
    </div>
  );
};

export default MazePage;
