import { NavLink } from "react-router-dom";

import { useAuthentication } from "../../hooks/useAuthentication";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaPuzzlePiece } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";

import { useAuthValue } from "../../context/AuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        <FaPuzzlePiece />
        My <span>Blockly</span> Maze
      </NavLink>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Nome ou código do jogo..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>
          <HiSearch />
        </button>
      </form>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
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
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar novo jogo
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
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
    </nav>
  );
};

export default Navbar;
