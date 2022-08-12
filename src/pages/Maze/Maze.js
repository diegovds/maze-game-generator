import styles from "./Maze.module.css";
import { backend } from "../../backend/config";

// hooks
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";
import MazePage from "../../components/MazePage/MazePage";

const Maze = () => {
  const { id } = useParams();

  const [maze, setMaze] = useState(undefined);
  const [error, setError] = useState(undefined);

  const loadingMaze = maze === undefined;
  const loadingError = error === undefined;

  const getAMaze = useCallback(async () => {
    fetch(backend + "/mazes/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Jogo não encontrado.");
      })
      .then((maze) => {
        maze = maze.data;

        maze.created_at = new Date(maze.created_at).toLocaleDateString("pt-BR");

        setMaze(maze);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  useEffect(() => {
    getAMaze();
  }, [getAMaze]);

  const reload = () => {
    setMaze(undefined);
    getAMaze();
  };

  const errorReturn = () => {
    const e = new Error("Ocorreu um erro, por favor tente mais tarde.");
    // e.message is 'Ocorreu um erro, por favor tente mais tarde.'
    throw setError(e);
  }

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
  }

  if (loadingMaze && loadingError) {
    return <Loading />;
  }

  if (!loadingError) {
    return (
      <LoadingError message={error.message} />
    );
  }

  return (
    <div className={styles.maze_container}>
      <div className={styles.maze}>
        {maze && <MazePage key={maze.id} maze={maze} childToParent={reload} childToParent2={errorReturn} childToParent3={notify} />}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Maze;
