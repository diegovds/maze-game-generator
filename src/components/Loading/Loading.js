import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <span>Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
