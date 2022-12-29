import styles from "./MazeDetail.module.css";

import { Link } from "react-router-dom";

import { useRef, useEffect, useState } from 'react'

import ScrollReveal from 'scrollreveal'

import { ScrollRevealOptions } from "../Scroll/ScrollRevealOptions"

const MazeDetail = ({ maze }) => {
  const elementRef = useRef();

  const [styleImg, setStyleImg] = useState("img_loading");
  const [styleImgLoading, setStyleImgLoading] = useState('img_loaded_white');

  useEffect(() => {
    const divElement = elementRef.current;
    ScrollReveal().reveal(divElement, ScrollRevealOptions);
  }, []);

  const imgChange = () => {
    setStyleImg('img_loaded')
    setStyleImgLoading('img_loading')
  };

  return (
    <div className='load-hidden'>
      <div  ref={elementRef}>
        <div className={styles.maze}>
          <img className={styleImgLoading} src="/null.png" alt="Imagem de carregamento" />
          <img className={styleImg} src={maze.url_image} alt={maze.image} onLoad={imgChange}/>
          <h3>{maze.name}</h3>
          <p id='date'>Criado em:<br />{maze.created_at}</p>
          <Link to={`/mazes/${maze.id}`} className='btn'>Detalhes</Link>
        </div>
      </div>
    </div>
  )
}

export default MazeDetail