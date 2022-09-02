import styles from "./IframePage.module.css";

const IframePage = ({ link }) => {
  return (
    <div className={styles.container}>
      <iframe
        src={link}
        className={styles.iframe}
        title="iframePage"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default IframePage;
