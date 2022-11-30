import styles from "./Home.module.css";

import { useQuery } from "react-query";
import axio from "../../services/api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// components
import MazeDetail from "../../components/MazeDetail/MazeDetail";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";

const Home = () => {
  useEffect(() => {
    document.title = "My BLOCKLY Maze | Home";
  }, []);

  const {
    isLoading,
    error,
    data: mazes,
  } = useQuery(
    ["mazes"],
    async () =>
      await axio.get("/mazes").then((data) => {
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

        return data;
      })
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <LoadingError message={error.message} />;
  }

  return (
    <>
      <div className={styles.home}>
        <h2>Jogos criados recentemente:</h2>
        {/*
          <form onSubmit={handleSubmit} className={styles.search_form}>
            <input
              type="text"
              placeholder="Nome do jogo..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-dark">Pesquisar</button>
          </form>
          */}
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
