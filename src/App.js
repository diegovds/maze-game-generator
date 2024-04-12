import "./App.css";

import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Loading from "./components/Loading/Loading";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTopPage from "./components/Scroll/ScrollToTopPage";
import ScrollTopButton from "./components/Scroll/ScrollTopButton/ScrollTopButton";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { Context } from "./context/Context";

// Pages
import Analytics from "./components/Analytics";
import NotFound from "./pages/404/NotFound";
import About from "./pages/About/About";
import CreateMaze from "./pages/CreateMaze/CreateMaze";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Maze from "./pages/Maze/Maze";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";

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

  useEffect(() => {
    window.location.assign('https://myblocklymaze-v2.vercel.app/')
  }, []);

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
