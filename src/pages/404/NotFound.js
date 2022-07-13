import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>Erro 404</h1>
        <br />
        <h2>A página que você procura não foi encontrada</h2>
        <>
          {/*<p className={styles.p_a}>Ocorreu um erro ao procurar o jogo</p>
          <Link to="/" className="btn btn-dark">Voltar</Link>*/}
        </>
      </div>
    </div>
  );
};

export default NotFound;
