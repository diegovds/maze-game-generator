import styles from "./Home.module.css";

import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// components
import MazeDetail from "../../components/MazeDetail/MazeDetail";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";

const Home = () => {
  const [mazes, setMazes] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllMazes = async () => {
      await api
        .get("/mazes")
        .then((data) => {
          data = data.data.data;

          setMazes(data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    getAllMazes();
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <LoadingError message={error.message} />;
  }

  return (
    <>
      <Helmet>
        <meta property="og:url" content="https://myblocklymaze.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Home da plataforma My BLOCKLY Maze"
        />
        <meta
          property="og:description"
          content="Plataforma de criação e compartilhamento de jogos de labirinto,"
        />
        <meta property="og:image" content="https://i.imgur.com/lOHn1bD.png" />
        <title>My BLOCKLY Maze | Home</title>
      </Helmet>
      <div className={styles.home}>
        <h2>Jogos criados recentemente:</h2>
      </div>

      <div className={styles.mazes_container}>
        {mazes && mazes.map((maze) => <MazeDetail key={maze.id} maze={maze} />)}
      </div>

      {mazes && mazes.length === 0 && (
        <div className={styles.nomazes}>
          <p>Não foram encontrados jogos</p>
          <Link to="/mazes/create" className="btn">
            Criar primeiro jogo
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
