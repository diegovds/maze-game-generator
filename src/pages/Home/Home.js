import styles from "./Home.module.css";

import { backend } from "../../backend/config";
import { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import { Link } from "react-router-dom";

// components
import MazeDetail from "../../components/MazeDetail";

const Home = () => {
  const { isLoading, data, error } = useFetch(backend + "/mazes");
  const [mazes, setMazes] = useState(undefined);

  const loadingMazes = mazes === undefined;

  useEffect(() => {
    const getAllMazes = async () => {
      if (!isLoading && !error && loadingMazes) {
        data.data.forEach((item) => {
          if (item.name.length > 8) {
            item.name = item.name.substr(0, 8);
            item.name = item.name.concat("...");
          }
          item.created_at = new Date(item.created_at).toLocaleDateString(
            "pt-BR"
          );
        });

        setMazes(data.data);
        /*console.log(data)*/
      }
    };
    getAllMazes();
  }, [data, error, isLoading, loadingMazes]);

  if (loadingMazes && isLoading) {
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
