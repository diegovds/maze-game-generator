import styles from "./MobileNavbar.module.css";

import { HiSearch } from "react-icons/hi";
import { FaPuzzlePiece } from "react-icons/fa";
import { isMobileOnly } from "react-device-detect";

import { NavLink } from "react-router-dom";

import { useState, useRef } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const MobileNavbar = () => {
  const checkbox = useRef();
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (event) => {
    event.target.checked ? setShowMenu(true) : setShowMenu(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    navigate(`/search?q=${query}`);
    e.target.reset();
    setQuery("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          <FaPuzzlePiece />
        </NavLink>
        <form
          onSubmit={handleSubmit}
          className={styles.search_form}
          style={showMenu ? { display: "none" } : {}}
        >
          <input
            className={styles.input}
            type="search"
            placeholder="Busca..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>
            <HiSearch />
          </button>
        </form>
        <div
          className={`${styles.menu} ${isMobileOnly ? styles.mobile : ""}`}
          id={showMenu ? styles.hidden : ""}
        >
          <NavLink
            to="/"
            onClick={() => {
              checkbox.current.click();
            }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaPuzzlePiece />
            My <span>Blockly</span> Maze
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              checkbox.current.click();
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
                  checkbox.current.click();
                }}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => {
                  checkbox.current.click();
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
                  checkbox.current.click();
                }}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar novo jogo
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => {
                  checkbox.current.click();
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
              checkbox.current.click();
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
                  checkbox.current.click();
                }}
              >
                Sair
              </button>
            </>
          )}
        </div>
        <div
          className={styles.menuMobile}
          id={showMenu ? styles.hiddenHamburger : ""}
        >
          <input
            type="checkbox"
            id={styles.checkbox_menu}
            name="grid"
            onChange={handleChange}
            ref={checkbox}
          />

          <label htmlFor={styles.checkbox_menu}>
            <span
              style={
                showMenu
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#000" }
              }
            ></span>
            <span
              style={
                showMenu
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#000" }
              }
            ></span>
            <span
              style={
                showMenu
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#000" }
              }
            ></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
