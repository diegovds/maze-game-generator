import styles from "./MobileNavbar.module.css";

import { HiSearch } from "react-icons/hi";
import { FaPuzzlePiece } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { isMobileOnly } from "react-device-detect";

import { NavLink } from "react-router-dom";

import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const MobileNavbar = ({ openMenu }) => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const changeHamburger = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      setShowMenu(false);
      openMenu(false);
    } else {
      setShowMenu(true);
      openMenu(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    navigate(`/search?q=${query}`);
    changeHamburger();
    e.target.reset();
    setQuery("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          <FaPuzzlePiece />
          My <span>Blockly</span> Maze
        </NavLink>
        <div
          className={`${styles.menu} ${isMobileOnly ? styles.mobile : ""}`}
          id={showMenu ? styles.hidden : ""}
        >
          <form onSubmit={handleSubmit} className={styles.search_form}>
            <input
              className={styles.input}
              type="search"
              placeholder="Nome ou código do jogo..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>
              <HiSearch />
            </button>
          </form>
          <NavLink
            to="/"
            onClick={() => {
              changeHamburger();
            }}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
          {!user && (
            <>
              <NavLink
                to="/login"
                onClick={() => {
                  changeHamburger();
                }}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => {
                  changeHamburger();
                }}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink
                to="/mazes/create"
                onClick={() => {
                  changeHamburger();
                }}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar novo jogo
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => {
                  changeHamburger();
                }}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </>
          )}

          <NavLink
            to="/about"
            onClick={() => {
              changeHamburger();
            }}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
          {user && (
            <>
              <button
                className={styles.btn_logout}
                onClick={() => {
                  logout();
                  changeHamburger();
                }}
              >
                Sair
              </button>
            </>
          )}
        </div>
        <div
          className={styles.hamburger}
          id={showMenu ? styles.hiddenHamburger : ""}
          onClick={() => {
            changeHamburger();
          }}
        >
          <Hamburger
            size={26}
            hideOutline={false}
            rounded={true}
            color={showMenu ? "#fff" : "#000"}
            toggled={isOpen}
            toggle={setIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
