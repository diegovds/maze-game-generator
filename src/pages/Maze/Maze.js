import styles from "./Maze.module.css";
import { backend } from "../../backend/config";

// hooks
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState(undefined);
  const [runGame, setRunGame] = useState(undefined);

  const loadingMaze = maze === undefined;
  const loadingError = error === undefined;
  const loadingRunGame = runGame === undefined;

  useEffect(() => {
    const getAMaze = async () => {
      fetch(backend + "/mazes/" + id)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Jogo não encontrado.");
        })
        .then((maze) => {
          maze = maze.data;

          maze.created_at = new Date(maze.created_at).toLocaleDateString(
            "pt-BR"
          );

          setMaze(maze);
        })
        .catch((error) => {
          setError(error);
        });
    };
    document.title = "My BLOCKLY Maze | " + id;
    getAMaze();
  }, [id, refetch]);

  const reload = () => {
    setMaze(undefined);
    setRefetch(!refetch);
    setRunGame(true);
  };

  const endGame = () => {
    /*window.scrollTo(0, 0);
    setRunGame(undefined);*/
    return navigate("/");
  };

  const errorReturn = () => {
    const e = new Error("Ocorreu um erro, por favor tente mais tarde.");
    // e.message is 'Ocorreu um erro, por favor tente mais tarde.'
    throw setError(e);
  };

  const notify = () => {
    toast.success("Link copiado com sucesso!", {
      position: "top-left",
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    });
  };

  if (loadingMaze && loadingError && loadingRunGame) {
    return <Loading />;
  }

  if (!loadingError && loadingRunGame) {
    return <LoadingError message={error.message} />;
  }

  if (!loadingRunGame && loadingError && !loadingMaze) {
    return (
      <>
        <IframePage
          link={
            "https://myblocklymaze-game.vercel.app/maze.html?levels=" +
            JSON.stringify(maze.levels) +
            "&url_image=" +
            maze.url_image +
            "&reset=1"
          }
          redirect={endGame}
        />
      </>
    );
  }

  return (
    <div className={styles.maze_container}>
      <div className={styles.maze}>
        {maze && (
          <MazePage
            key={maze.id}
            maze={maze}
            childToParent={reload}
            childToParent2={errorReturn}
            childToParent3={notify}
          />
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Maze;
