import React, { useState } from "react";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CreatePostDialog from "./CreatePostDialog";

const Navbar = ({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleCreatePostOpen = () => {
    setIsCreatePostOpen(true);
    handleMenuClose();
  };

  const handleCreatePostClose = () => {
    setIsCreatePostOpen(false);
  };

  const handlePostCreated = () => {
    console.log("Post created successfully!");
    queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
  };

  return (
    <>
      <AppBar 
        position="static"
        elevation = {0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)", // 50% fehér opacitás
          backdropFilter: "blur(10px)", // Homályosítás a modern hatás érdekében
          borderRadius: "16px", // Lekerekített sarkok
          margin: "8px", // Távolság a szélektől
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Enyhe árnyék
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between", // A Blog App és Menu gombok közötti távolság
          }}
        >
          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "#1a2b6d", // Sötétkék szöveg
              fontWeight: 600,
              fontSize: "1.25rem", // Nagyobb szövegméret
              textTransform: "none", // Ne legyen nagybetűs
              transition: "transform 0.3s ease", // Hover animáció
              "&:hover": {
                transform: "scale(1.1)", // Hover állapotban nagyítás
              },
            }}
          >
            Blog App
          </Button>
          <Button
            color="inherit"
            onClick={handleMenuOpen}
            sx={{
              color: "#1a2b6d", // Sötétkék szöveg
              fontWeight: 600,
              fontSize: "1.25rem", // Nagyobb szövegméret
              textTransform: "none", // Ne legyen nagybetűs
              transition: "transform 0.3s ease", // Hover animáció
              "&:hover": {
                transform: "scale(1.1)", // Hover állapotban nagyítás
              },
            }}
          >
            Menu
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {!isAuthenticated
              ? [
                  <MenuItem key="login" onClick={() => navigate("/login")}>Login</MenuItem>,
                  <MenuItem key="register" onClick={() => navigate("/register")}>Register</MenuItem>,
                  <MenuItem key="scroll-mode" onClick={() => navigate("/scroll-mode")}>Scroll Mode</MenuItem>,
                ]
              : [
                  <MenuItem key="profile" onClick={() => navigate("/profile")}>Profile</MenuItem>,
                  <MenuItem key="create" onClick={handleCreatePostOpen}>Create Post</MenuItem>,
                  <MenuItem key="scroll-mode" onClick={() => navigate("/scroll-mode")}>Scroll Mode</MenuItem>,
                  <MenuItem key="logout" onClick={() => { onLogout(); navigate("/"); }}>Logout</MenuItem>,
                ]}
          </Menu>
        </Toolbar>
      </AppBar>
      <CreatePostDialog
        open={isCreatePostOpen}
        onClose={handleCreatePostClose}
        onPostCreated={handlePostCreated}
      />
      <Toolbar />
    </>
  );
};

export default Navbar;