import styles from './Home.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// components

const Home = () => {
  const [query, setQuery] = useState('')
  const [mazes, setMazes] = useState(undefined)

  const loadingMazes = mazes === undefined

  const handleSubmit = e => {
    e.preventDefault()
  }

  useEffect(() => {
    const getAllMazes = async () => {
      const response = await fetch(
        'https://maze-game-backend.herokuapp.com/api/mazes'
      )
      var data = await response.json()

      data = data.data

      data.forEach(item => {
        item.created_at = new Date(item.created_at).toLocaleDateString('pt-BR')
      })

      setMazes(data)
      console.log(data)
    }
    getAllMazes()
  }, [])

  if (loadingMazes) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.home}>
      <h1>Jogos mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Nome do jogo..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className={styles.mazes_container}>
        {mazes && mazes.map((maze) => (
          <div key={maze.id} className={styles.maze}>
            <img src="/sky.png" alt="Céu com estrelas" />
            <h3>{maze.name}</h3>
            <p id='date'>Criado em: {maze.created_at}</p>
            <Link to="/about" className='btn'>Detalhes</Link>
          </div>
        ))}
        {mazes && mazes.length === 0 && (
          <div className={styles.nomazes}>
            <p>Não foram encontrados jogos</p>
            <Link to="/mazes/create" className='btn'>Criar primeiro jogo</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
