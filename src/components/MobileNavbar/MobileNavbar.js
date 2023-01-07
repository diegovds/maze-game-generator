import styles from "./MobileNavbar.module.css";

import { HiSearch } from "react-icons/hi";
import { FaPuzzlePiece } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";

import { NavLink } from "react-router-dom";

import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const MobileNavbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const changeHamburger = () => {
    if (isOpen) {
      setOpen(!isOpen);
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          <FaPuzzlePiece />
          My <span>Blockly</span> Maze
        </NavLink>
        <div className={styles.menu} id={showMenu ? styles.hidden : ""}>
          
          <NavLink
            to="/"
            onClick={() => {
              changeHamburger();
            }}
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
              >
                Entrar
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => {
                  changeHamburger();
                }}
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
              >
                Criar novo jogo
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => {
                  changeHamburger();
                }}
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
          onClick={() => {
            changeHamburger();
          }}
        >
          <Hamburger
            size={26}
            hideOutline={false}
            rounded={true}
            color="#000"
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
