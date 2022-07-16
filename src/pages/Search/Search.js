import styles from "./Search.module.css";

import { backend } from "../../backend/config";

// hook
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "../../hooks/useQuery";
import useFetch from "react-fetch-hook";
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";

// components
import MazeDetail from "../../components/MazeDetail";

const requestTrigger = createTrigger();

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const requestTriggerValue = useTrigger(requestTrigger);
  const { isLoading, data, error } = useFetch(backend + "/mazes", {
    depends: [requestTriggerValue],
  });

  const [key, setKey] = useState(undefined);
  const [mazes, setMazes] = useState(undefined);
  const loadingMazes = mazes === undefined;

  if (key !== search && key !== undefined) {
    setMazes(undefined);
    setKey(search);
    requestTrigger();
  }

  const getFilterMazes = useCallback(async () => {
    if (!isLoading && error === undefined && loadingMazes) {
      var filter = [];

      data.data.forEach((item) => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          filter.push(item);
        }

        if (item.name.length > 8) {
          item.name = item.name.substr(0, 8);
          item.name = item.name.concat("...");
        }

        item.created_at = new Date(item.created_at).toLocaleDateString("pt-BR");
      });
      setKey(search);
      setMazes(filter);
      /*console.log(filter)*/
    }
  }, [search, data, error, isLoading, loadingMazes]);

  useEffect(() => {
    getFilterMazes();
  }, [getFilterMazes]);

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
      <div className={styles.search_container}>
        <h2>Pesquisa por "{search}" :</h2>
        <div>
          {mazes && mazes.length === 0 && (
            <>
              <p className={styles.p_a}>
                Não foram encontrados jogos a partir da sua pesquisa...
              </p>
              {/*<Link to="/" className="btn btn-dark">Voltar</Link>*/}
            </>
          )}
        </div>
      </div>
      <div className={styles.mazes_container}>
        {mazes && mazes.map((maze) => <MazeDetail key={maze.id} maze={maze} />)}
      </div>
      <div>
        {mazes && mazes.length !== 0 && (
          <>{/*<Link to="/" className="btn btn-dark">Voltar</Link>*/}</>
        )}
      </div>
    </>
  );
};

export default Search;
