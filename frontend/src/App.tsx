import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import BlogPostPage from "./pages/BlogPostPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import ScrollMode from "./pages/ScrollMode";
import FloatingShapesBackground from "./components/FloatingShapesBackground";

// Custom hook to track window width
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

// Component that handles the conditional rendering logic
const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [shouldShowScrollMode, setShouldShowScrollMode] = useState(false);
  const windowWidth = useWindowWidth();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  // Check if we should show ScrollMode using useEffect
  useEffect(() => {
    setShouldShowScrollMode(windowWidth < 800 && location.pathname === '/');
  }, [windowWidth, location.pathname]);

  if (shouldShowScrollMode) {
    return (
      <>
        <FloatingShapesBackground />
        <Grid
          container
          direction="column"
          sx={{
            height: "100vh",
            width: "100vw",
            background: "transparent",
            display: "flex",
            flexDirection: "column !important",
            alignItems: "stretch",
            overflowX: "hidden", // Prevent horizontal scroll
            overflowY: "hidden", // Let individual components handle vertical scroll
          }}
        >
          {/* Navbar */}
          <Grid 
            item 
            sx={{ 
              flexShrink: 0,
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
              display: "flex",
              justifyContent: "center", // Center the navbar
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "min(1030px, calc(100vw - 16px))", // Match content max width
                padding: "0 8px", // Horizontal padding instead of margin
                overflow: "hidden",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            </Box>
          </Grid>

          {/* ScrollMode content */}
          <Grid 
            item 
            xs 
            sx={{ 
              flexGrow: 1, 
              display: "flex", 
              flexDirection: "column",
              width: "100%",
              maxWidth: "100%",
              minHeight: 0,
              overflowX: "hidden",
            }}
          >
            <Box
              sx={{
                margin: "16px auto",
                padding: "32px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Átlátszó fehér háttér
                backdropFilter: "blur(5px)", // Homályosítás
                borderRadius: "16px", // Lekerekített sarkok
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Árnyék
                overflowY: "auto", // Görgetés engedélyezése
                overflowX: "hidden", // Prevent horizontal scroll
                marginLeft: "16px", // Fixed left margin for consistent spacing
                marginRight: "16px", // Fixed right margin for consistent spacing
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center content horizontally
                justifyContent: "flex-start", // Align content to top
                maxWidth: "min(1030px, calc(100vw - 32px))", // Responsive max width with margins
                width: "calc(100% - 32px)", // Width accounting for margins
                height: "calc(100% - 32px)", // Ensure proper height
                boxSizing: "border-box", // Include padding in width calculation
              }}
            >
              <ScrollMode />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
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
              maxWidth: "min(1030px, calc(100vw - 32px))", // Teljes szélesség
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
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;