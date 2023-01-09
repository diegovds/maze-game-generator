import styles from "./About.module.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "My BLOCKLY Maze | Sobre";
  }, []);

  return (
    <div className={styles.about}>
      <h2>Sobre:</h2>

      <div className={styles.container}>
        <section>
          <h3>My Blockly Maze</h3>
          <p className={styles.p_int}>
            É uma plataforma de criação e compartilhamento de jogos de
            labirinto, nela os usuários também podem jogar suas criações e as da
            comunidade.
            <br />
            Os jogos utilizam programação baseada em blocos para concluir os
            desafios.
          </p>
        </section>

        <section>
          <h3>Maze Builder</h3>
          <p className={styles.p_int}>
            É a ferramenta de criação dos jogos, nela é possível elaborar um
            jogo de labirinto com imagem de fundo e níveis de desafio
            personalizados.
          </p>
        </section>
        <section>
          <h3>Maze Game</h3>
          <p className={styles.p_int}>
            Uma versão modificada do Maze Blockly Games desenvolvido pelo
            Google. Tem como função executar os jogos personalizados.
          </p>
        </section>
      </div>
      <Link to="/mazes/create" className="btn">
        Criar jogo
      </Link>
    </div>
  );
};

export default About;
