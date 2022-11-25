//import styles from "./CreateMaze.module.css";

import { backend } from "../../backend/config";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import IframePage from "../../components/IframePage/IframePage";

const CreateMaze = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const navigate = useNavigate();

  const [userId, setUserId] = useState(undefined);

  const loadingUser = userId === undefined;

  useEffect(() => {
    const searchUserId = async () => {
      const response = await fetch(backend + "/users/" + uid);
      var data = await response.json();
      data = data.data;

      setUserId(data.id);
    };
    document.title = "My BLOCKLY Maze | Criação";
    searchUserId();
  }, [uid]);

  const redirect = (data) => {
    return navigate("/mazes/" + data);
  };

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <>
      <IframePage
        link={"https://mazegamebuilder.vercel.app/index.html?userId=" + userId}
        redirect={redirect}
      />
    </>
  );
};

export default CreateMaze;
