import styles from './CreateMaze.module.css'

import { backend } from '../../backend/config'
import { useAuthValue } from "../../context/AuthContext"
import { useEffect, useState } from 'react'

const CreateMaze = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const [userId, setUserId] = useState(undefined)

  const loadingUser = userId === undefined

  useEffect(() => {
    const searchUserId = async () => {
      const response = await fetch(backend + "/users")
      var data = await response.json()
      data = data.data
  
      for(var user in data){
        if(data[user].uid === uid){
          setUserId(data[user].id)
          /*console.log(data[user].id)*/
        }
      }
    };
    searchUserId()
  }, [uid])
  
  if (loadingUser) {
    return <p>Carregando...</p>
  }

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