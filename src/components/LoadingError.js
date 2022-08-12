import styles from "./LoadingError.module.css";

const LoadingError = ({ message }) => {
  return (
    <div className={styles.loadError}>
      <p>{message}</p>
    </div>
  );
};

export default LoadingError;
