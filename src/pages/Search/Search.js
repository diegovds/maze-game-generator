import styles from "./Search.module.css";

import api from "../../services/api";

// hook
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// components
import MazeDetail from "../../components/MazeDetail/MazeDetail";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";

const Search = () => {
  const [query] = useSearchParams();
  const search = query.get("q");

  const [mazes, setMazes] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFilterMazes = async () => {
      var filter = [];
      setIsFetching(true);
      setMazes(null);

      await api
        .get("/mazes")
        .then((data) => {
          data = data.data.data;

          data.forEach((item) => {
            if (item.name.toLowerCase().includes(search.toLowerCase())) {
              filter.push(item);
            }

            if (item.code !== null) {
              if (
                item.code.toLowerCase().includes(search.toLowerCase()) &&
                filter.find((filtered) => filtered.id === item.id) === undefined
              ) {
                filter.push(item);
              }
            }
          });
          setMazes(filter);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    document.title = "My BLOCKLY Maze | Busca";
    getFilterMazes();
  }, [search]);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <LoadingError message={error.message} />;
  }

  return (
    <>
      <div className={styles.search_container}>
        <h2>Pesquisa por "{search}"</h2>
        <p>
          Quantidade de jogos encontrados: <strong>{mazes.length}</strong>
        </p>
        <div>
          {mazes && mazes.length === 0 && (
            <>
              <p className={styles.p_a}>
                Não foram encontrados jogos a partir da sua pesquisa...
              </p>
            </>
          )}
        </div>
      </div>
      <div className={styles.mazes_container}>
        {mazes && mazes.map((maze) => <MazeDetail key={maze.id} maze={maze} />)}
      </div>
    </>
  );
};

export default Search;
