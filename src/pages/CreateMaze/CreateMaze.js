import styles from "./CreateMaze.module.css";

import { backend } from "../../backend/config";

// hooks
import useFetch from "react-fetch-hook";
import { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContext";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [userId, setUserId] = useState(undefined);

  const { isLoading, error, data } = useFetch(backend + "/users");

  const loadingUser = userId === undefined;

  console.log("error", error);
  console.log("isloading", isLoading);

  useEffect(() => {
    const searchUserId = async () => {
      if (!isLoading && !error) {
        data.data.forEach((item) => {
          if (item.uid === uid) {
            setUserId(item.id);
            /*console.log(data[user].id)*/
          }
        });
      }
    };
    searchUserId();
  }, [uid, data, isLoading, error]);

  if (isLoading && loadingUser) {
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
