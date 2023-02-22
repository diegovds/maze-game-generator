import styles from "./Search.module.css";

// hook
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";

// components
import MazeDetail from "../../components/MazeDetail/MazeDetail";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";

const Search = () => {
  const [query] = useSearchParams();
  const search = query.get("q");

  const { getAllMazes, data: mazes, isFetching, error } = useAxios();

  useEffect(() => {
    getAllMazes("/mazes", search);

    document.title = "My BLOCKLY Maze | Busca";
  }, [getAllMazes, search]);

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
