//import styles from "./CreateMaze.module.css";

import { useQuery } from "react-query";
import axio from "../../services/api";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import IframePage from "../../components/IframePage/IframePage";
import LoadingError from "../../components/LoadingError/LoadingError";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My BLOCKLY Maze | Criação";
  }, []);

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(
    ["user"],
    async () =>
      await axio.get("/users/" + uid).then((data) => {
        data = data.data.data;

        return data;
      }),
    {
      staleTime: 1000 * 60, // só faz outra requisição depois de 1 minuto
    }
  );

  const redirect = (data) => {
    return navigate("/mazes/" + data);
  };

  if (isLoading) return <Loading />;

  if (error) return <LoadingError message={error.message} />;

  return (
    <>
      <IframePage
        link={
          "https://mazegamebuilder.vercel.app/index.html?userId=" + userData.id
        }
        redirect={redirect}
      />
    </>
  );
};

export default CreateMaze;
