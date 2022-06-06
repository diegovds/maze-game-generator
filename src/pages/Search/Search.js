import styles from './Search.module.css'

import { Link } from "react-router-dom";

// hook
import { useState, useEffect } from 'react'
import { useQuery } from '../../hooks/useQuery'

// components
import MazeDetail from "../../components/MazeDetail"

const Search = () => {
  const query = useQuery()
  const search = query.get("q")

  const [mazes, setMazes] = useState(undefined)
  const loadingMazes = mazes === undefined

  useEffect(() => {
    const getFilterMazes = async () => {
      const response = await fetch(
        'https://maze-game-backend.herokuapp.com/api/mazes'
      )
      var data = await response.json()
      var filter = []

      data = data.data

      data.forEach(item => {
        item.created_at = new Date(item.created_at).toLocaleDateString('pt-BR')
      })

      data.forEach(item => {
        if(item.name.toLowerCase().includes(search.toLowerCase())){
          filter.push(item)
        }
      })

      setMazes(filter)
      /*console.log(filter)*/
    }
    getFilterMazes()
  }, [search])

  if (loadingMazes) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.search_container}>
      <h2>Busca:</h2>
      <div>
        {mazes && mazes.length === 0 && (
          <>
            <p>Não foram encontrados jogos a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">Voltar</Link>
          </>
        )}
      </div>
      <div className={styles.mazes_container}>
        {mazes && mazes.map((maze) => <MazeDetail key={maze.id} maze={maze}/>)}
      </div>
      <div>
        {mazes && mazes.length !== 0 && (
          <>
            <Link to="/" className="btn btn-dark">Voltar</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Search