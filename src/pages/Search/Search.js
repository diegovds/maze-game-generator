import styles from "./Search.module.css";

import { backend } from "../../backend/config";

// hook
import { useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";

// components
import MazeDetail from "../../components/MazeDetail/MazeDetail";
import Loading from "../../components/Loading/Loading";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const [mazes, setMazes] = useState(undefined);
  const loadingMazes = mazes === undefined;

  useEffect(() => {
    const getFilterMazes = async () => {
      setMazes(undefined);
      const response = await fetch(backend + "/mazes");
      var data = await response.json();
      var filter = [];

      data = data.data;

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

        if (item.name.length > 8) {
          item.name = item.name.substr(0, 8);
          item.name = item.name.concat("...");
        }

        item.created_at = new Date(item.created_at).toLocaleDateString("pt-BR");
      });
      setMazes(filter);
    };
    getFilterMazes();
    /*console.log(filter)*/
  }, [search]);

  if (loadingMazes) {
    return <Loading />;
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
