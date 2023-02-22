//import styles from "./CreateMaze.module.css";

import { useAuthValue } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";
import IframePage from "../../components/IframePage/IframePage";
import { useMediaQuery } from "usehooks-ts";
import { useAxios } from "../../hooks/useAxios";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 1115px)");

  const { searchUserId, data: userId, isFetching, error } = useAxios();

  useEffect(() => {
    searchUserId("/users/" + uid);
    document.title = "My BLOCKLY Maze | Criação";
  }, [searchUserId, uid]);

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
