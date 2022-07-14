import styles from "./MazeDetail.module.css";

import { Link } from "react-router-dom";

import { useRef, useEffect } from 'react'

import ScrollReveal from 'scrollreveal'

import { ScrollRevealOptions } from "./ScrollRevealOptions"

const MazeDetail = ({ maze }) => {
  const elementRef = useRef();


  useEffect(() => {
    const divElement = elementRef.current;
    ScrollReveal().reveal(divElement, ScrollRevealOptions);
  }, []);

  return (
    <div className='load-hidden'>
      <div  ref={elementRef}>
        <div className={styles.maze}>
          <img src={maze.url_image} alt={maze.image} />
          <h3>{maze.name}</h3>
          <p id='date'>Criado em: {maze.created_at}</p>
          <Link to={`/mazes/${maze.id}`} className='btn'>Detalhes</Link>
        </div>
      </div>
    </div>
  )
}

export default MazeDetail