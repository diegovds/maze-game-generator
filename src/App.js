import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import ScrollToTopPage from "./components/Scroll/ScrollToTopPage";
import ScrollTopButton from "./components/Scroll/ScrollTopButton/ScrollTopButton";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";

// Hooks
import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { Context } from "./context/Context";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateMaze from "./pages/CreateMaze/CreateMaze";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import Maze from "./pages/Maze/Maze";
import NotFound from "./pages/404/NotFound";
import Analytics from "./components/Analytics";

function App() {
  const { state, dispatch } = useContext(Context);
  const [showMenu, setShowMenu] = useState(false);
  const { auth } = useAuthentication();

  const isMobile = useMediaQuery("(max-width: 1115px)");

  const loadingUser = state.user.userInfo === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "CHANGE_USERINFO",
        payload: {
          userInfo: user,
        },
      });
    });
  }, [auth, dispatch]);

  useEffect(() => {
    setShowMenu(false); /** remove o blurBackground ao redimensionar a janela */
  }, [isMobile]);

  const openMenu = (open) => {
    setShowMenu(open);
  };

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTopPage />
        <Analytics />
        <ScrollTopButton />
        {isMobile ? <MobileNavbar openMenu={openMenu} /> : <Navbar />}
        <div className="container" id={showMenu ? "blurBackground" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mazes/:id" element={<Maze />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/login"
              element={
                !state.user.userInfo ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/register"
              element={
                !state.user.userInfo ? (
                  <Register />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/mazes/create"
              element={
                state.user.userInfo ? <CreateMaze /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/dashboard"
              element={
                state.user.userInfo ? <Dashboard /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
