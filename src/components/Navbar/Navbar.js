import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../../hooks/useAuthentication'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'

import styles from './Navbar.module.css'

const Navbar = () => {
  const { user } = useAuthValue()
  const { logout } = useAuthentication()

  const [query, setQuery] = useState('')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    e.target.reset();
    if( query ){
      return navigate(`/search?q=${query}`)
    }
  }

  function mostrarMenu() {
    var barra = document.getElementById("barraNavegacao");
    if (barra.className === "barranavegacao") {
       barra.className += " responsivo";
    } else {
       barra.className = "barranavegacao";
    }
 }

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
      My <span>Blockly</span> Maze
      </NavLink>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Nome ou código do jogo..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Pesquisar</button>
      </form>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/mazes/create"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Criar novo jogo
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
      <button onClick={mostrarMenu} className={styles.abre}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: 18 }}><path style={{fill: "#000"}} d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg></button>
    </nav>
  )
}

export default Navbar
