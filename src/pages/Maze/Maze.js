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
            <ToastContainer />
            <p className={styles.p_a}>Ao clicar no botão abaixo você será redirecionado para a página do Maze Game.</p>
            <button onClick={() => goToMaze()} className="btn">Ir para o Maze Game</button>
            <button onClick={() => {clipboard(); notify()}} className="btn" style={{ marginLeft: 8}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: 18, paddingTop: 1 }}><path style={{fill: "#fff"}} d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"/></svg></button>
            {/**<a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels)}>Ir para o Maze Game</a>
            <Link to="/" className="btn btn-dark">Voltar</Link>*/}
          </>
        )}
      </div>
    </div>
  )
}

export default Maze