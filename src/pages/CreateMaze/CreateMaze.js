import styles from './CreateMaze.module.css'

import { useState } from 'react'
import { useAuthValue } from "../../context/AuthContext"

const CreateMaze = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  return (
    <div className={styles.create_maze}>
      <h2>Criar jogo</h2>
      <p>Ao clicar no botão abaixo você será redirecionado para a página de criação do jogo.</p>
      <a className="btn" target="_blank" rel="noopener noreferrer" href={"https://mapper-iota.vercel.app/index.html?uid=" + uid}>Ir</a>
      {/*<a className="btn" href="https://mapper-iota.vercel.app/index.html?esteDeenvio">Ir</a>*/}
    </div>
  )
}

export default CreateMaze