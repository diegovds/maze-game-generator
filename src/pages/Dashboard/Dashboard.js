import styles from './Dashboard.module.css'

import Modal from 'react-modal'

import { Link } from 'react-router-dom'
import { backend } from '../../backend/config'

// hooks
import { useAuthValue } from "../../context/AuthContext"
import { useCallback, useEffect, useState } from 'react'

Modal.setAppElement('#root')

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const [userData, setUserData] = useState(undefined)
  const [mazeId, setMazeId] = useState(undefined)
  const [modalIsOpen, setIsOpen] = useState(false)

  const loadingUser = userData === undefined

  function handleOpenModal(){
    setIsOpen(true)
  }

  function handleCloseModal(){
    setIsOpen(false)
  }

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
    setMazeId(id)
    await fetch(backend + "/mazes/" + id, {
      method: "DELETE"
    })
    handleOpenModal()
    searchUserData()
  }

  if (loadingUser) {
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
          <Modal 
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Exemple Modal"
            overlayClassName={styles.modal_overlay}
            className={styles.modal_content}
          >
            <h3>Jogo excluído com sucesso!</h3>
            <button onClick={handleCloseModal} className="btn btn-dark">Fechar</button>
          </Modal>
        </div>
      )}
      
      {userData &&
        userData.mazes.slice(0).reverse().map((userData) => (
          <div className={styles.maze_row} key={userData.id}>
            <p>{userData.name}</p>
            <div className={styles.actions}>
              <Link to={`/mazes/${userData.id}`} className="btn">
                Detalhes
              </Link>
              {userData.id !== mazeId && (
                <button
                  onClick={() => deleteMaze(userData.id)}
                  className="btn btn-outline btn-danger"
                >
                  Excluir
                </button>
              )}
              {userData.id === mazeId && (
                <button className="btn" disabled>
                  Aguarde...
                </button>
              )}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Dashboard