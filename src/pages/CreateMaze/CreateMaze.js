import styles from './CreateMaze.module.css'

import { useAuthValue } from "../../context/AuthContext"
import { useEffect, useState } from 'react'

const CreateMaze = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const [userId, setUserId] = useState([])

  useEffect(() => {
    const searchUserId = async () => {
      const response = await fetch("https://maze-game-backend.herokuapp.com/api/users")
      var data = await response.json()
  
      for(var users in data){
        for(var user in data[users]){
          if(data[users][user].uid === uid){
            setUserId(data[users][user].id)
            console.log(data[users][user].id)
          }
        }
      }
    };
    searchUserId()
  }, [uid])
  

  return (
    <div className={styles.create_maze}>
      <h2>Criar jogo</h2>
      <p>Ao clicar no botão abaixo você será redirecionado para a página de criação do jogo.</p>
      <a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mazegamebuilder.vercel.app/index.html?userId=" + userId}>Ir para o Maze Builder</a>
      {/*<a className="btn" href="https://mazegamebuilder.vercel.app/index.html?esteDeenvio">Ir</a>*/}
    </div>
  )
}

export default CreateMaze