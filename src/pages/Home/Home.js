import styles from "./Home.module.css";

import { backend } from "../../backend/config";
import { Link } from "react-router-dom";

// hooks
import useFetch from "react-fetch-hook";
import { useEffect, useState } from "react";

// components
import MazeDetail from "../../components/MazeDetail";

const Home = () => {
  const { isLoading, error, data } = useFetch(backend + "/mazes");
  const [mazes, setMazes] = useState(undefined);

  const loadingDate = mazes === undefined;

  useEffect(() => {
    const dateUpdate = () => {
      var filter = [];

      if (!isLoading && !error) {
        data.data.forEach((item) => {
          item.created_at = new Date(item.created_at).toLocaleDateString(
            "pt-BR"
          );
          filter.push(item);
        });
        setMazes(filter);
      }
    };
    dateUpdate();
  }, [data, isLoading, error]);

  if (isLoading && loadingDate) {
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
