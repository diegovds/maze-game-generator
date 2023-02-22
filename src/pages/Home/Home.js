import styles from "./Home.module.css";

import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// components
import MazeDetail from "../../components/MazeDetail/MazeDetail";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";

const Home = () => {
  const { getAllMazes, data: mazes, isFetching, error } = useAxios();

  useEffect(() => {
    getAllMazes("/mazes", false);
    document.title = "My BLOCKLY Maze | Home";
  }, [getAllMazes]);

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
