import styles from "./Maze.module.css";
import api from "../../services/api";

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
      await api
        .get("/mazes/" + id)
        .then((data) => {
          data = data.data.data;

          setMaze(data);
        })
        .catch(() => {
          setError("Jogo não encontrado 😢");
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
    setError("Ocorreu um erro, por favor tente mais tarde 👎");
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
    return <LoadingError message={error} />;
  }

  if (!loadingRunGame && loadingError && !loadingMaze) {
    return (
      <>
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
