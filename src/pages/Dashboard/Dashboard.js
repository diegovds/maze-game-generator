import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
import api from "../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import MazeDelete from "../../components/MazeDelete/MazeDelete";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const searchUserData = async () => {
      await api
        .get("/users/" + uid)
        .then((data) => {
          if (data.data.error) {
            setError("Usuário não encontrado 😢");
          } else {
            data = data.data.data;

            setUserData(data);
          }
        })
        .catch(() => {
          setError("Ocorreu um erro, por favor tente mais tarde 👎");
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    document.title = "My BLOCKLY Maze | Dashboard";
    searchUserData();
  }, [uid, reload]);

  const deleteMaze = async (id) => {
    await toast.promise(
      api.delete("/mazes/" + id),
      {
        pending: "Processando solicitação",
        success: "Jogo excluído com sucesso 👌",
        error: "Ocorreu um erro ao tentar excluir o jogo 🤯",
      },
      {
        position: "top-left",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      }
    );

    setTimeout(() => {
      setUserData(undefined);
      //searchUserData();
      setReload(!reload);
    }, 2000); // aguarda 2 segundos
  };

  const returnDataChildToParent = (data) => {
    deleteMaze(data);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <LoadingError message={error} />;
  }

  return (
    <>
      <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie os seus jogos</p>
        {userData && userData.mazes.length === 0 ? (
          <div className={styles.nomazes}>
            <br />
            <p>Não foram encontrados jogos</p>
            <Link to="/mazes/create" className="btn">
              Criar primeiro jogo
            </Link>
          </div>
        ) : (
          <div className={styles.maze_header}>
            {/*<span>Nome(s)</span>
            <span>Ações</span>*/}
          </div>
        )}
      </div>
      <div className={styles.mazes_container}>
        {userData &&
          userData.mazes.map((userData) => (
            <MazeDelete
              key={userData.id}
              maze={userData}
              returnDataChildToParent={returnDataChildToParent}
            />
          ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
