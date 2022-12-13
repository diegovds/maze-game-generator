import styles from "./MazeDelete.module.css";

import { Link } from "react-router-dom";

import Modal from 'react-modal'

import { useRef, useEffect, useState } from "react";

import ScrollReveal from "scrollreveal";

import { ScrollRevealOptions } from "../Scroll/ScrollRevealOptions"

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

Modal.setAppElement('#root')

const MazeDelete = ({ maze, returnDataChildToParent }) => {
  const [mazeId, setMazeId] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false)
  const elementRef = useRef();

  function handleOpenModal(){
    setIsOpen(true)
  }

  function handleCloseModal(){
    setIsOpen(false)
  }

  useEffect(() => {
    const divElement = elementRef.current;
    ScrollReveal().reveal(divElement, ScrollRevealOptions);
  }, []);

  const deleteMaze = (id) => {
    setMazeId(id)
    returnDataChildToParent(id)
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
        <h3>Deseja excluir o jogo {maze.name} (Cód. {maze.code})?</h3>
        <p>Essa ação não pode ser desfeita!</p>
        <div className={styles.div_btn}>
          <button
            onClick={() => {deleteMaze(maze.id); handleCloseModal()}}
            className="btn btn-outline btn-danger"
          >
            Excluir
          </button>
          <button onClick={handleCloseModal} className="btn">
            Cancelar
          </button>
        </div>
      </Modal>
      <div className="load-hidden">
        <div ref={elementRef}>
          <div className={styles.maze}>
            {/*<img src={maze.url_image} alt={maze.image} />*/}
            <LazyLoadImage src={maze.url_image} placeholderSrc="./placeholder.png" effect="blur" alt={maze.image} />
            <h3>{maze.name}</h3>
            <p id="date">Criado em:<br />{maze.created_at}</p>
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
        </div>
      </div>
    </>
  );
};

export default MazeDelete;
