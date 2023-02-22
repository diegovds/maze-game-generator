import api from "../services/api";
import { useState, useCallback } from "react";

export const useAxios = () => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const getAllMazes = useCallback(async (endpoint, search) => {
    let filter = [];

    await api
      .get(endpoint)
      .then((data) => {
        data = data.data.data;

        if (search) {
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
        }

        if (filter.length > 0) {
          setData(filter);
        } else if (filter.length === 0 && search) {
          setData(0);
        } else {
          setData(data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const getAMaze = useCallback(async (endpoint) => {
    await api
      .get(endpoint)
      .then((data) => {
        data = data.data.data;

        setData(data);
      })
      .catch(() => {
        setError("Jogo não encontrado 😢");
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const updateAMaze = useCallback(async (maze) => {
    return new Promise((resolve, reject) => {
      const dataMaze = new FormData();
      const execs = maze.executions + 1;

      dataMaze.append("executions", execs);

      api
        .put("/mazes/" + maze.id, dataMaze)

        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          String(e.response?.data?.message).includes("Maze não encontrado")
            ? reject("Jogo não encontrado 😢")
            : reject("Ocorreu um erro, por favor tente mais tarde 👎");
        });
    });
  }, []);

  const searchUserId = useCallback(async (endpoint) => {
    await api
      .get(endpoint)
      .then((data) => {
        data = data.data.data;

        setData(data.id);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return {
    getAllMazes,
    getAMaze,
    updateAMaze,
    searchUserId,
    data,
    error,
    isFetching,
  };
};
