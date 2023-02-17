import styles from "./Maze.module.css";
import api from "../../services/api";

// hooks
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";
import MazePage from "../../components/MazePage/MazePage";
import IframePage from "../../components/IframePage/IframePage";

const Maze = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maze, setMaze] = useState(undefined);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [runGame, setRunGame] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1115px)");

  useEffect(() => {
    const getAMaze = async () => {
      await api
        .get("/mazes/" + id)
        .then((data) => {
          data = data.data.data;

          setMaze(data);
        })
        .catch(() => {
          setError("Jogo não encontrado 😢");
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    document.title = "My BLOCKLY Maze | " + id;
    getAMaze();
  }, [id]);

  const loadGame = () => {
    maze.executions += 1;
    setRunGame(true);
  };

  const endGame = () => {
    window.scrollTo(0, 0);
    setRunGame(false);
    navigate(`/mazes/${id}`);
  };

  const errorReturn = (message) => {
    setError(message);
  };

  const notify = (status) => {
    status === "copy"
      ? toast.success("Link copiado com sucesso!", {
          position: "top-left",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        })
      : toast.error(
          "A execução do jogo não está disponível para essa largura de tela.",
          {
            position: "top-left",
            autoClose: 3000,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          }
        );
  };

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <LoadingError message={error} />;
  }

  if (runGame) {
    return (
      <>
        {isMobile ? (
          <LoadingError message="A reprodução de jogos não está disponível para essa largura de tela." />
        ) : (
          <IframePage
            link={
              "https://myblocklymaze-game.vercel.app/maze.html?levels=" +
              maze.levels +
              "&url_image=" +
              maze.url_image +
              "&reset=1"
            }
            redirect={endGame}
          />
        )}
      </>
    );
  }

  return (
    <div className={styles}>
      {maze && (
        <MazePage
          key={maze.id}
          maze={maze}
          loadGame={loadGame}
          errorReturn={errorReturn}
          notify={notify}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Maze;
