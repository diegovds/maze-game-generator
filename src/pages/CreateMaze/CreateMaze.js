//import styles from "./CreateMaze.module.css";

import api from "../../services/api";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";
import IframePage from "../../components/IframePage/IframePage";
import useMedia from "use-media";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const navigate = useNavigate();
  const isMobile = useMedia({ maxWidth: 1115 });

  const [userId, setUserId] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchUserId = async () => {
      await api
        .get("/users/" + uid)
        .then((data) => {
          data = data.data.data;

          setUserId(data.id);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    document.title = "My BLOCKLY Maze | Criação";
    searchUserId();
  }, [uid]);

  const redirect = (data) => {
    return navigate("/mazes/" + data);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <LoadingError message={error.message} />;
  }

  return (
    <>
      {isMobile ? (
        <LoadingError message="A criação de jogos não está disponível para essa largura de tela." />
      ) : (
        <IframePage
          link={
            "https://mazegamebuilder.vercel.app/index.html?userId=" + userId
          }
          redirect={redirect}
        />
      )}
    </>
  );
};

export default CreateMaze;
