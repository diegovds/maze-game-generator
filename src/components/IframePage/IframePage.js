import styles from "./IframePage.module.css";

import { useEffect, useRef } from "react";

const IframePage = ({ link, redirect }) => {
  const iframe = useRef();

  useEffect(() => {
    iframe.current.scrollIntoView();
  }, []);

  // window escutando o evento `message` que o postMessage envia
  window.addEventListener("message", function (e) {
    // para ter acesso ao dado temos que acessar a propriedade data
    //if (e.data === "mensagem vinda do iframe") {
    if (String(e.data).includes("mensagem")) {
      //console.log(e.data);
      if (String(e.data).includes("mazeId=")) {
        //console.log("tem mazeId");
        let mazeId = String(e.data).slice(17);
        //console.log(mazeId); /** id do novo maze criado */
        redirect(mazeId);
      } else {
        redirect();
      }
    }
  });

  return (
    <div className={styles.container}>
      <iframe
        src={link}
        className={styles.iframe}
        title="iframeLink"
        frameBorder="0"
        ref={iframe}
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default IframePage;
