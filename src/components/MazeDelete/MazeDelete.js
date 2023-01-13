import styles from "./MazeDelete.module.css";

import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

import { motion } from "framer-motion";
import { initial, whileInView, transition } from "../FramerMotionOptions";

Modal.setAppElement("#root");

const MazeDelete = ({ maze, returnDataChildToParent }) => {
  const [mazeId, setMazeId] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [styleImg, setStyleImg] = useState("img_loading");
  const [styleImgLoading, setStyleImgLoading] = useState("img_loaded_white");

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const imgChange = () => {
    setStyleImg("img_loaded");
    setStyleImgLoading("img_loading");
  };

  const deleteMaze = (id) => {
    setMazeId(id);
    returnDataChildToParent(id);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Delete Modal"
        overlayClassName={styles.modal_overlay}
        className={styles.modal_content}
      >
        <h3>
          Deseja excluir o jogo {maze.name} (Cód. {maze.code})?
        </h3>
        <p>Essa ação não pode ser desfeita!</p>
        <div className={styles.div_btn}>
          <button
            onClick={() => {
              deleteMaze(maze.id);
              handleCloseModal();
            }}
            className="btn btn-outline btn-danger"
          >
            Excluir
          </button>
          <button onClick={handleCloseModal} className="btn">
            Cancelar
          </button>
        </div>
      </Modal>
      <motion.div
        initial={initial}
        whileInView={whileInView}
        transition={transition}
      >
        <div className={styles.maze}>
          <img
            className={styleImgLoading}
            src="/null.png"
            alt="Imagem de carregamento"
          />
          <img
            className={styleImg}
            src={maze.url_image}
            alt={maze.image}
            onLoad={imgChange}
          />
          <h3>{maze.name}</h3>
          <p id="date">
            Criado em:
            <br />
            {maze.created_at}
          </p>
          <Link to={`/mazes/${maze.id}`} className="btn">
            Detalhes
          </Link>
          {maze.id !== mazeId && (
            <button
              onClick={() => handleOpenModal()}
              className="btn btn-outline btn-danger"
            >
              Excluir
            </button>
          )}
          {maze.id === mazeId && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MazeDelete;
