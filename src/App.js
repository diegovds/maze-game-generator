import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import ScrollToTopPage from "./components/Scroll/ScrollToTopPage";
import ScrollTopButton from "./components/Scroll/ScrollTopButton/ScrollTopButton";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";

// Hooks
import { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { AuthProvider } from "./context/AuthContext";

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
  const [user, setUser] = useState(undefined);
  const [showMenu, setShowMenu] = useState(false);
  const [isNewRegister, setIsNewRegister] = useState(false);
  const { auth } = useAuthentication();

  const isMobile = useMediaQuery("(max-width: 1115px)");

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  useEffect(() => {
    setShowMenu(false); /** remove o blurBackground ao redimensionar a janela */
  }, [isMobile]);

  const openMenu = (open) => {
    setShowMenu(open);
  };

  const newRegister = (isNew) => {
    setIsNewRegister(isNew);
  };

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
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
                element={!user ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/register"
                element={
                  !user ? (
                    <Register newRegister={newRegister} />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
              <Route
                path="/mazes/create"
                element={user ? <CreateMaze /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={
                  user ? (
                    <Dashboard
                      newRegister={newRegister}
                      isNewRegister={isNewRegister}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
