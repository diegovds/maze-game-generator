import styles from "./IframePage.module.css";

import { useEffect, useRef, useCallback } from "react";

const IframePage = ({ link, redirect }) => {
  const iframe = useRef();

  const handleMessage = useCallback(
    (e) => {
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
    },
    [redirect]
  );

  useEffect(() => {
    // window escutando o evento `message` que o postMessage envia
    window.addEventListener("message", handleMessage);
    // 👇️ remove o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  return (
    <div className={styles.container}>
      <iframe
        src={link}
        className={styles.iframe}
        title="iframeLink"
        frameBorder="0"
        ref={iframe}
        allowFullScreen={true}
        onLoad={() => iframe.current.scrollIntoView()}
      ></iframe>
    </div>
  );
};

export default IframePage;
