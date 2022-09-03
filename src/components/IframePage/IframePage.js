import styles from "./IframePage.module.css";

import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useCallback, useRef } from "react";
import { backend } from "../../backend/config";

const IframePage = ({ link, returnDataChildToParent }) => {
  const isFirstRender = useRef(true);
  const iframe = useRef();
  const { user } = useAuthValue();
  const uid = user.uid;

  const searchUserData = useCallback(async () => {
    var response = await fetch(backend + "/users/" + uid + "/" + uid);
    var data = await response.json();
    data = data.data;

    returnDataChildToParent(data.mazes[0].id);
  }, [uid, returnDataChildToParent]);

  useEffect(() => {
    iframe.current.scrollIntoView();
  }, []);

  const reload = () => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    searchUserData();
  };

  return (
    <div className={styles.container}>
      <iframe
        src={link}
        className={styles.iframe}
        title="iframeLink"
        frameBorder="0"
        onLoad={reload}
        ref={iframe}
      ></iframe>
    </div>
  );
};

export default IframePage;