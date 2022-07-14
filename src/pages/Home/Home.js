import styles from './Home.module.css'

import { backend } from '../../backend/config'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import ScrollReveal from 'scrollreveal'

// components
import MazeDetail from "../../components/MazeDetail"

const Home = () => {
  const [mazes, setMazes] = useState(undefined)
  const elementRef = useRef();

  const loadingMazes = mazes === undefined

  useEffect(() => {
    const getAllMazes = async () => {
      const response = await fetch(
        backend + '/mazes'
      )
      var data = await response.json()

      data = data.data

      data.forEach(item => {
        if (item.name.length > 8) {
          item.name = item.name.substr(0,8)
          item.name = item.name.concat("...")
        }
        item.created_at = new Date(item.created_at).toLocaleDateString('pt-BR')
      })

      setMazes(data)
      /*console.log(data)*/
    }
    getAllMazes()
  }, [])

  useEffect(() => {
    const divElement = elementRef.current;
    //console.log(divElement); // conteudo atualizado da div
    if(!loadingMazes){
      //console.log("ScrollReveal")
      //console.log(divElement.getElementsByTagName('div')[0]); // conteudo atualizado da div
      ScrollReveal({
        
      })
      ScrollReveal().reveal(divElement.getElementsByTagName('div')[0], {
        //origin: 'right',
        //distance: '150em',
        //duration: 1300
      })
      ScrollReveal().reveal(divElement.getElementsByTagName('div')[1], {
        //distance: '150em',
        //duration: 1300,
        
        delay: 700,
      })
    }
  }, [loadingMazes]);

  if (loadingMazes) {
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
    <div className='load-hidden'>
      <div  ref={elementRef}>
        <div className={styles.home}>
          <h2>Jogos criados recentemente:</h2>
          {/*
          <form onSubmit={handleSubmit} className={styles.search_form}>
            <input
              type="text"
              placeholder="Nome do jogo..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-dark">Pesquisar</button>
          </form>
          */}
        </div>
        
        <div className={styles.mazes_container}>
          {mazes && mazes.map((maze) => <MazeDetail key={maze.id} maze={maze}/>)}
        </div>
        
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
