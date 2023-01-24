import styles from "./About.module.css";

import { motion } from "framer-motion";
import { container, item } from "../../components/FramerMotionOptions";

import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "My BLOCKLY Maze | Sobre";
  }, []);

  return (
    <div className={styles.about}>
      <h2>Sobre:</h2>

      <motion.div
        className={styles.container}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={item}>
          <h3>My Blockly Maze</h3>
          <p className={styles.p_int}>
            É uma plataforma de criação e compartilhamento de jogos de
            labirinto, nela os usuários também podem jogar suas criações e as da
            comunidade.
            <br />
            Os jogos utilizam programação baseada em blocos para concluir os
            desafios.
          </p>
        </motion.section>

        <motion.section variants={item}>
          <h3>Maze Builder</h3>
          <p className={styles.p_int}>
            É a ferramenta de criação dos jogos, nela é possível elaborar um
            jogo de labirinto com imagem de fundo e níveis de desafio
            personalizados.
          </p>
        </motion.section>
        <motion.section variants={item}>
          <h3>Maze Game</h3>
          <p className={styles.p_int}>
            Uma versão modificada do Maze Blockly Games desenvolvido pelo
            Google. Tem como função executar os jogos personalizados.
          </p>
        </motion.section>
      </motion.div>
      <Link to="/mazes/create" className="btn">
        Criar jogo
      </Link>
    </div>
  );
};

export default About;
