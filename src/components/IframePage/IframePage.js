import styles from "./IframePage.module.css";

import { useState, useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import LoadingError from "../LoadingError/LoadingError";

const IframePage = ({ link, redirect }) => {
  const { width, height } = useWindowSize();
  const [deviceType, setDeviceType] = useState("");
  const [orientationError, setOrientationError] = useState(false);
  const iframe = useRef();

  const getDeviceType = () => {
    if (navigator.userAgent.match(/mobile/i)) {
      setDeviceType("Mobile");
    } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
      setDeviceType("Tablet");
    } else {
      setDeviceType("Desktop");
    }
  };

  useEffect(() => {
    iframe.current.scrollIntoView();
  }, []);

  useEffect(() => {
    if (width < height) {
      setOrientationError(true);
    } else {
      setOrientationError(false);
    }

    getDeviceType();
  }, [width, height]);

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

  if (orientationError) {
    return (
      <LoadingError message="Gire o dispositivo para a posição horizontal!" />
    );
  }

  return (
    <>
      {(deviceType === "Mobile" || deviceType === "Tablet") &&
        alert("Funcionamento limitado em dispositivos móveis")}
      <div className={styles.container}>
        <iframe
          src={link}
          className={styles.iframe}
          id={
            deviceType === "Mobile" || deviceType === "Tablet"
              ? styles.mobile
              : ""
          }
          title="iframeLink"
          ref={iframe}
          allowFullScreen={true}
        ></iframe>
      </div>
    </>
  );
};

export default IframePage;
