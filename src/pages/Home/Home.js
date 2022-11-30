import styles from "./Home.module.css";

import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

          data.forEach((item) => {
            if (item.name.length > 8) {
              item.name = item.name.substr(0, 8);
              item.name = item.name.concat("...");
            }
            item.created_at = new Date(item.created_at).toLocaleDateString(
              "pt-BR"
            );
          });

          setMazes(data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    document.title = "My BLOCKLY Maze | Home";
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
