import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import BlogPostPage from "./pages/BlogPostPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import ScrollMode from "./pages/ScrollMode";
import FloatingShapesBackground from "./components/FloatingShapesBackground";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <FloatingShapesBackground />
      <Grid
        container
        direction="column"
        sx={{
          height: "100vh",
          background: "transparent", // Kék gradiens háttér
        }}
      >
        {/* Első sor: Navbar */}
        <Grid item>
          <Box
            sx={{
              margin: "8px", // Térköz a navbar körül
              padding: "8px", // Belső térköz
              overflow: "hidden", // Lekerekített sarkok hatása
              justifyContent: "center", // Középre igazítás
            }}
          >
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          </Box>
        </Grid>

        {/* Második sor: Route-ok által meghatározott tartalom */}
        <Grid item xs>
          <Box
            sx={{
              margin: "16px auto",
              padding: "32px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.3)", // Átlátszó fehér háttér
              backdropFilter: "blur(5px)", // Homályosítás
              borderRadius: "16px", // Lekerekített sarkok
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Árnyék
              overflowY: "auto", // Görgetés engedélyezése
              marginLeft: "auto", // Középre igazítás
              marginRight: "auto", // Középre igazítás
              justifyContent: "center", // Középre igazítás
              maxWidth: "1030px", // Teljes szélesség
              
            }}
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/blogpost/:id" element={<BlogPostPage />} />
              <Route path="/scroll-mode" element={<ScrollMode />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;