import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
import api from "../../services/api";

import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import MazeDelete from "../../components/MazeDelete/MazeDelete";
import Loading from "../../components/Loading/Loading";
import LoadingError from "../../components/LoadingError/LoadingError";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [mazeDelete, setMazeDelete] = useState(undefined);

  useEffect(() => {
    const searchUserData = async () => {
      await api
        .get("/users/" + uid)
        .then((data) => {
          data = data.data.data;

          setUserData(data);
        })
        .catch((e) => {
          String(e.response.data.message).includes("Usuário não encontrado")
            ? setError("Usuário não encontrado 😢")
            : setError("Ocorreu um erro, por favor tente mais tarde 👎");
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    document.title = "My BLOCKLY Maze | Dashboard";
    searchUserData();
  }, [uid, reload]);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal(loading) {
    if (loading !== "true") {
      setMazeDelete(undefined);
    }
    setIsOpen(false);
  }

  const deleteMaze = async (id) => {
    await toast
      .promise(
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
      )
      .catch(() => {
        setMazeDelete(undefined);
      });

    setTimeout(() => {
      //setUserData(undefined); /** efeito de recarregamento */
      setReload(!reload);
    }, 2000); // aguarda 2 segundos
  };

  const getMazeDelete = (maze) => {
    handleOpenModal();
    setMazeDelete(maze);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <LoadingError message={error} />;
  }

  return (
    <>
      {mazeDelete && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Delete Modal"
          overlayClassName={styles.modal_overlay}
          className={styles.modal_content}
        >
          <h3>
            Deseja excluir o jogo {mazeDelete.name} (Cód. {mazeDelete.code})?
          </h3>
          <p>Essa ação não pode ser desfeita!</p>
          <div className={styles.div_btn}>
            <button
              onClick={() => {
                deleteMaze(mazeDelete.id);
                handleCloseModal("true");
              }}
              className="btn btn-outline btn-danger"
            >
              Excluir
            </button>
            <button
              onClick={() => {
                handleCloseModal();
              }}
              className="btn"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
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
          userData.mazes.map((userData) =>
            userData.id !== mazeDelete?.id ? (
              <MazeDelete
                key={userData.id}
                maze={userData}
                getMazeDelete={getMazeDelete}
              />
            ) : (
              <MazeDelete
                key={userData.id}
                maze={userData}
                getMazeDelete={getMazeDelete}
                loadingDelete={true}
              />
            )
          )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
