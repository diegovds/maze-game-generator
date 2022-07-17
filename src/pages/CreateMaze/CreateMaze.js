import styles from "./CreateMaze.module.css";

import { backend } from "../../backend/config";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [userId, setUserId] = useState(undefined);

  const loadingUser = userId === undefined;

  useEffect(() => {
    const searchUserId = async () => {
      const response = await fetch(backend + "/users/" + uid + "/" + uid);
      var data = await response.json();
      data = data.data;

      setUserId(data.id);
    };
    searchUserId();
  }, [uid]);

  if (loadingUser) {
    return (
      <Loading/>
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
