import styles from "./MobileNavbar.module.css";

import { useState } from "react";
import { NavLink } from "react-router-dom";

import { HiSearch } from "react-icons/hi";
import { FaPuzzlePiece } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const NewNavbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [showLinks, setShowLiks] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const changeHamburger = () => {
    if (isOpen) {
      setOpen(!isOpen);
      setShowLiks(false);
    } else {
      setShowLiks(true);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <div className={styles.leftSide}>
          <div className={styles.links} id={showLinks ? styles.hidden : ""}>
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
          {/*<button onClick={() => setShowLiks(!showLinks)}>
            <IoMdReorder />
          </button>*/}
          <div
            className={styles.hamburger}
            onClick={() => {
              changeHamburger();
            }}
          >
            <Hamburger
              size={22}
              hideOutline={false}
              rounded={true}
              color="#000"
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <NavLink to="/" className={styles.brand}>
            <FaPuzzlePiece />
            My <span>Blockly</span> Maze
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
