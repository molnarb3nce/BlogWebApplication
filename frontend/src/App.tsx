import { useState, useEffect } from "react";
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
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          {/* Navbar */}
          <Grid 
            component="div"
            sx={{ 
              flexShrink: 0,
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "min(1030px, calc(100vw - 16px))",
                margin: "8px",
                padding: "8px",
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
            component="div"
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
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(5px)",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflowY: "auto",
                overflowX: "hidden",
                marginLeft: "16px",
                marginRight: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                maxWidth: "min(1030px, calc(100vw - 32px))",
                width: "calc(100% - 32px)",
                height: "calc(100% - 32px)",
                boxSizing: "border-box",
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
          background: "transparent",
        }}
      >
        {/* Első sor: Navbar */}
        <Grid component="div">
          <Box
            sx={{
              margin: "8px",
              padding: "8px",
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          </Box>
        </Grid>

        {/* Második sor: Route-ok által meghatározott tartalom */}
        <Grid component="div" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              margin: "16px auto",
              padding: "32px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(5px)",
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
              maxWidth: "min(1030px, calc(100vw - 32px))",
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