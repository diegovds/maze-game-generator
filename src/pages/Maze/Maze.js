import styles from './Maze.module.css'
import { backend } from '../../backend/config'
import { Link } from "react-router-dom";

// hooks
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Maze = () => {
  const {id} = useParams()

  const [maze, setMaze] = useState(undefined)
  const [user, setUser] = useState(undefined)

  const loadingMaze = maze === undefined
  const loadingUser = user === undefined

  const getAMaze = useCallback ( async () => {
      var response = await fetch(
        backend + '/mazes/' + id
      )
      var maze = await response.json()

      maze = maze.data

      maze.created_at = new Date(maze.created_at).toLocaleDateString('pt-BR')
      
      response = await fetch(
        backend + '/users/' + maze.user_id
      )
      var user = await response.json()

      user = user.data

      setMaze(maze)
      setUser(user)
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

    await fetch(backend + "/mazes/" + maze.id, {
      method: "PUT",
      body: dataMaze
    })

    getAMaze()

    window.open("https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels) + "&url_image=" +maze.url_image, '_blank');
  }

  if (loadingMaze || loadingUser) {
    return (
      <div className="loading">
        <div className="dual-ring"></div>
        <div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.maze_container}>
      {maze && user && (
        <>
          <h2>{maze.name}</h2>
          <img src={maze.url_image} alt={maze.image} />
          <p className={styles.p_data}>Criado em {maze.created_at} pelo usuário {user.username}</p>
          <p className={styles.p_data}>Total de execuções: {maze.executions}</p>
          {/*<p className={styles.p_data}>Taxa de conclusão: {((maze.conclusions * 100) / maze.executions).toFixed(2)}%</p>*/}
          <p className={styles.p_a}>Ao clicar no botão abaixo você será redirecionado para a página do Maze Game.</p>
          <button onClick={() => goToMaze()} className="btn">Ir para o Maze Game</button>
          {/**<a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mazegame-phi.vercel.app/maze.html?levels=" + JSON.stringify(maze.levels)}>Ir para o Maze Game</a>
          <Link to="/" className="btn btn-dark">Voltar</Link>*/}
        </>
      )}
    </div>
  )
}

export default Maze