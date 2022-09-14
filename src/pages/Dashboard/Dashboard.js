import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
import { backend } from "../../backend/config";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import MazeDelete from "../../components/MazeDelete/MazeDelete";
import Loading from "../../components/Loading/Loading";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [userData, setUserData] = useState(undefined);

  const loadingUser = userData === undefined;

  const searchUserData = useCallback(async () => {
    var response = await fetch(backend + "/users/" + uid + "/" + uid);
    var data = await response.json();
    data = data.data;

    data.mazes.forEach((item) => {
      if (item.name.length > 8) {
        item.name = item.name.substr(0, 8);
        item.name = item.name.concat("...");
      }

      item.created_at = new Date(item.created_at).toLocaleDateString("pt-BR");
    });

    setUserData(data);
    /*console.log(data[user].mazes.length)*/
  }, [uid]);

  useEffect(() => {
    searchUserData();
  }, [searchUserData]);

  const deleteMaze = async (id) => {
    await toast.promise(
      fetch(backend + "/mazes/" + id, {
        method: "DELETE",
      }), {
        pending: 'Processando solicitação',
        success: 'Jogo excluído com sucesso 👌',
        error: 'Ocorreu um erro ao tentar excluir o jogo 🤯',
      }, {
        position: "top-left",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored"
      }
    );
    //handleOpenModal()
    
    setTimeout(() => {
      setUserData(undefined);
      searchUserData();
    }, 2000) // aguarda 2 segundos para chamar searchUserData()

  };

  const returnDataChildToParent = (data) => {
    deleteMaze(data)
  };

  if (loadingUser) {
    return (
      <Loading/>
    );
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
      {/*userData &&
          userData.mazes.slice(0).reverse().map((userData) => (
            <div className={styles.maze_row} key={userData.id}>
              <p>{userData.name}</p>
              <div className={styles.actions}>
                <Link to={`/mazes/${userData.id}`} className="btn">
                  Detalhes
                </Link>
                {userData.id !== mazeId && (
                  <button
                    onClick={() => deleteMaze(userData.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                )}
                {userData.id === mazeId && (
                  <button className="btn" disabled>
                    Aguarde...
                  </button>
                )}
              </div>
            </div>
          ))
      */}
      <ToastContainer />
    </>
  );
};

export default Dashboard;
