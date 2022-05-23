import styles from './About.module.css'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o <span>Maze Game</span> Generator
      </h2>
      <p>Descrição da aplicação...........</p>
      <Link to="/mazes/create" className="btn">
        Criar jogo
      </Link>
    </div>
  )
}

export default About
