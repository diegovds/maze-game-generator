import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2>Página não encontrada!</h2>
      <>
        <p className={styles.p_a}>
          Ocorreu um erro ao procurar o jogo.
        </p>
        {/*<Link to="/" className="btn btn-dark">Voltar</Link>*/}
      </>
    </div>
  );
};

export default NotFound;
