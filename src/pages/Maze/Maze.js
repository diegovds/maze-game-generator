import styles from './Maze.module.css'
import { backend } from '../../backend/config'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// hooks
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../../components/Loading'

import copy from 'copy-to-clipboard';

const Maze = () => {
  const {id} = useParams()

  const [maze, setMaze] = useState(undefined)
  const [error, setError] = useState(undefined);

  const loadingMaze = maze === undefined
  const loadingError = error === undefined;

  const getAMaze = useCallback ( async () => {
    fetch(backend + "/mazes/" + id)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Jogo não encontrado.");
    })
    .then((maze) => {
      maze = maze.data;

      maze.created_at = new Date(maze.created_at).toLocaleDateString("pt-BR");

      setMaze(maze);
    })
    .catch((error) => {
      setError(error)
    });
    },
    [id]
  )

  useEffect(() => {
    getAMaze()
  }, [getAMaze])

  const goToMaze = async () => {
    const dataMaze = new FormData()
    const execs = maze.executions + 1

    dataMaze.append('executions', execs)

    fetch(backend + "/mazes/" + maze.id, {
      method: "PUT",
      body: dataMaze
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Ocorreu um erro, por favor tente mais tarde.");
    })
    .then((data) => {
      getAMaze()

      window.open("https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels) + "&url_image=" +maze.url_image, '_blank');
    })
    .catch((error) => {
      setError(error)
    });
  }

  const notify = () => {
    toast.success("Link copiado com sucesso!", {
      position: "top-left",
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    });
  }

  const clipboard = () => {
    copy(window.location.href);
  }

  if (loadingMaze  && loadingError) {
    return (
      <Loading/>
    )
  }

  if (!loadingError) {
    return (
      <div className="loading">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.maze_container}>
      <div className={styles.maze}>
        {maze && (
          <>
            <h2>{maze.name}</h2>
            <img src={maze.url_image} alt={maze.image} />
            <p className={styles.p_data}>Criado em {maze.created_at} pelo usuário {maze.username}</p>
            <p className={styles.p_data}>Total de execuções: {maze.executions}</p>
            {/*<p className={styles.p_data}>Taxa de conclusão: {((maze.conclusions * 100) / maze.executions).toFixed(2)}%</p>*/}
            <button onClick={() => {clipboard(); notify()}} className="btn">Copiar link de compartilhamento</button>
            <ToastContainer />
            <p className={styles.p_a}>Ao clicar no botão abaixo você será redirecionado para a página do Maze Game.</p>
            <button onClick={() => goToMaze()} className="btn">Ir para o Maze Game</button>
            {/**<a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels)}>Ir para o Maze Game</a>
            <Link to="/" className="btn btn-dark">Voltar</Link>*/}
          </>
        )}
      </div>
    </div>
  )
}

export default Maze