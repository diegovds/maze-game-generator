//import styles from "./CreateMaze.module.css";

import { backend } from "../../backend/config";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import IframePage from "../../components/IframePage/IframePage";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [userId, setUserId] = useState(undefined);

  const loadingUser = userId === undefined;

  useEffect(() => {
    const searchUserId = async () => {
      const response = await fetch(backend + "/users/" + uid + "/" + uid);
      var data = await response.json();
      data = data.data;

      setUserId(data.id);
    };
    searchUserId();
  }, [uid]);

  if (loadingUser) {
    return (
      <Loading/>
    );
  }

  return (
    <IframePage link={"https://mazegamebuilder.vercel.app/index.html?userId=" + userId}/>
  );
};

export default CreateMaze;
