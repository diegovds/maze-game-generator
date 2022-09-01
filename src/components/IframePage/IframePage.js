import styles from "./IframePage.module.css";

import Iframe from "react-iframe";

const IframePage = ({ link }) => {
  return (
    <div className={styles.container}>
      <Iframe url={link} className={styles.iframe} />
    </div>
  );
};

export default IframePage;
