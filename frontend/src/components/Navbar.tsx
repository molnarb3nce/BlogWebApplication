import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
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
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" onClick={() => navigate("/")} style={{ cursor: "pointer", flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" onClick={handleMenuOpen}>
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
    </>
  );
};

export default Navbar;