import styles from "./Footer.module.css"

const Footer = () => {
  return ( 
    <footer className={styles.footer}>
      <h3>Crie os seus próprios jogos de labirinto!</h3>
      <p>My <span>Blockly Maze</span> &copy; 2022</p>
    </footer>
  )
}

export default Footer