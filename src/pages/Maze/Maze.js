import styles from './Maze.module.css'
import { backend } from '../../backend/config'

import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// hooks
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../../components/Loading'

import copy from 'copy-to-clipboard';

const Maze = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [maze, setMaze] = useState(undefined)

  const loadingMaze = maze === undefined

  const getAMaze = useCallback ( async () => {
      try {
        var response = await fetch(
          backend + '/mazes/' + id
        )
        var maze = await response.json()
  
        maze = maze.data
  
        maze.created_at = new Date(maze.created_at).toLocaleDateString('pt-BR')
        
        setMaze(maze)
      } catch (error) {
        navigate("NotFound")
      }
    },
    [id, navigate]
  )

  useEffect(() => {
    getAMaze()
  }, [getAMaze])

  const goToMaze = async () => {
    const dataMaze = new FormData()
    const execs = maze.executions + 1

    dataMaze.append('executions', execs)

    await fetch(backend + "/mazes/" + maze.id, {
      method: "PUT",
      body: dataMaze
    })

    getAMaze()

    window.open("https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels) + "&url_image=" +maze.url_image, '_blank');
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

  if (loadingMaze) {
    return (
      <Loading/>
    )
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