import styles from "./MazeDelete.module.css";

import { Link } from "react-router-dom";

import Modal from 'react-modal'

import { useRef, useEffect, useState } from "react";

import ScrollReveal from "scrollreveal";

import { backend } from "../backend/config";

Modal.setAppElement('#root')

const MazeDelete = ({ maze, childToParent }) => {
  const [mazeId, setMazeId] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false)
  const elementRef = useRef();

  function handleOpenModal(){
    setIsOpen(true)
  }

  function handleCloseModal(){
    setIsOpen(false)
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {
    const divElement = elementRef.current;
    ScrollReveal({
      reset: true,
      origin: "top",
      distance: "30px",
      duration: 700,
    }).reveal(divElement);
  }, []);

  const deleteMaze = async (id) => {
    setMazeId(id);
    await fetch(backend + "/mazes/" + id, {
      method: "DELETE",
    });
    handleOpenModal()
    await sleep(5000) //wait 5 seconds
    childToParent()
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Exemple Modal"
        overlayClassName={styles.modal_overlay}
        className={styles.modal_content}
      >
        <h3>Jogo excluído com sucesso!</h3>
        <button onClick={handleCloseModal} className="btn btn-dark">
          Fechar
        </button>
      </Modal>
      <div className="load-hidden">
        <div ref={elementRef}>
          <div className={styles.maze}>
            <img src={maze.url_image} alt={maze.image} />
            <h3>{maze.name}</h3>
            <p id="date">Criado em: {maze.created_at}</p>
            <Link to={`/mazes/${maze.id}`} className="btn">
              Detalhes
            </Link>
            {maze.id !== mazeId && (
              <button
                onClick={() => deleteMaze(maze.id)}
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
        </div>
      </div>
    </>
  );
};

export default MazeDelete;
