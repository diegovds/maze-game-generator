import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'
import { backend } from '../../backend/config'

// hooks
import { useAuthValue } from "../../context/AuthContext"
import { useCallback, useEffect, useState } from 'react'

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const [userData, setUserData] = useState(undefined)

  const loadingUser = userData === undefined

  const searchUserData = useCallback ( async () => {
      var response = await fetch(backend + "/users")
      var data = await response.json()
      data = data.data

      for(var user in data){
        if(data[user].uid === uid){
          setUserData(data[user])
          /*console.log(data[user].mazes.length)*/
        }
      }
    },
    [uid]
  )

  useEffect(() => {
    searchUserData()
  }, [searchUserData])

  const deleteMaze = async (id) => {
    await fetch(backend + "/mazes/" + id, {
      method: "DELETE"
    })
    searchUserData()
  }

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus jogos</p>
      {userData && userData.mazes.length === 0 ? (
        <div className={styles.nomazes}>
          <p>Não foram encontrados jogos</p>
          <Link to="/mazes/create" className='btn'>Criar primeiro jogo</Link>
        </div>
      ) : (
        <div className={styles.maze_header}>
          <span>Nome(s)</span>
          <span>Ações</span>
        </div>
      )}
      
      {userData &&
        userData.mazes.map((userData) => (
          <div className={styles.maze_row} key={userData.id}>
            <p>{userData.name}</p>
            <div className={styles.actions}>
              <Link to={`/mazes/${userData.id}`} className="btn">
                Detalhes
              </Link>
              <button
                onClick={() => deleteMaze(userData.id)}
                className="btn btn-outline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Dashboard