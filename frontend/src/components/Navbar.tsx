import React, { useState } from "react";
import { AppBar, Toolbar, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CreatePostDialog from "./CreatePostDialog";

const Navbar = ({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Oldalsáv állapota
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const toggleSidebar = (open: boolean) => {
    setIsSidebarOpen(open);
  };

  const handleCreatePostOpen = () => {
    setIsCreatePostOpen(true);
    toggleSidebar(false);
  };

  const handleCreatePostClose = () => {
    setIsCreatePostOpen(false);
  };

  const handlePostCreated = () => {
    console.log("Post created successfully!");
    queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
  };

  const menuOptions = isAuthenticated
    ? [
        { label: "Profile", action: () => { navigate("/profile"); toggleSidebar(false); } },
        { label: "Create Post", action: () => { handleCreatePostOpen(); toggleSidebar(false); } },
        { label: "Logout", action: () => { onLogout(); navigate("/"); toggleSidebar(false); } },
      ]
    : [
        { label: "Login", action: () => { navigate("/login"); toggleSidebar(false); } },
        { label: "Register", action: () => { navigate("/register"); toggleSidebar(false); } },
      ];

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Átlátszó fehér háttér
          backdropFilter: "blur(10px)", // Homályosítás
          borderRadius: "16px", // Lekerekített sarkok
          margin: "8px", // Távolság a szélektől
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Árnyék
        }}
      >
        <Toolbar
          sx={{
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
            onClick={() => toggleSidebar(true)} // Oldalsáv megnyitása
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
        </Toolbar>
      </AppBar>

      {/* Oldalsáv */}
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => toggleSidebar(false)} // Oldalsáv bezárása
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Átlátszó fehér háttér
            backdropFilter: "blur(10px)", // Homályosítás
            width: "250px", // Oldalsáv szélessége
            padding: "16px", // Belső térköz
          },
        }}
      >
        <List>
          {menuOptions.map((option, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={option.action}>
                <ListItemText
                  primary={option.label}
                  sx={{
                    color: "#1a2b6d", // Sötétkék szöveg
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <CreatePostDialog
        open={isCreatePostOpen}
        onClose={handleCreatePostClose}
        onPostCreated={handlePostCreated}
      />
    </>
  );
};

export default Navbar;