import styles from "./CreateMaze.module.css";

import { backend } from "../../backend/config";
import { useAuthValue } from "../../context/AuthContext";
import useFetch from "react-fetch-hook";
import { useEffect, useState } from "react";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { isLoading, data, error } = useFetch(backend + "/users/" + uid + "/" + uid);

  const [userId, setUserId] = useState(undefined);

  const loadingUser = userId === undefined;

  useEffect(() => {
    const searchUserId = async () => {
      if (!isLoading && !error && loadingUser) {
      setUserId(data.data.id);
      /*console.log(data.id)*/
      }
    };
    searchUserId();
  }, [data, error, isLoading, loadingUser]);

  if (loadingUser && isLoading) {
    return (
      <div className="loading">
        <div className="dual-ring"></div>
        <div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <p>Ocorreu um erro, por favor tente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className={styles.maze_container}>
      <div className={styles.create_maze}>
        <h2>Criar jogo</h2>
        <p>
          Ao clicar no botão abaixo você será redirecionado para a página de
          criação do jogo.
        </p>
        <a
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
          href={
            "https://mazegamebuilder.vercel.app/index.html?userId=" + userId
          }
        >
          Ir para o Maze Builder
        </a>
        {/*<a className="btn" href="https://mazegamebuilder.vercel.app/index.html?esteDeenvio">Ir</a>*/}
      </div>
    </div>
  );
};

export default CreateMaze;
