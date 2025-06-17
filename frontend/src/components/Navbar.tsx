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
          backgroundColor: "#ffffff", // Fehér háttér
          borderRadius: "16px", // Lekerekített sarkok
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Árnyék
          width: "100%", // Full width of parent container
          maxWidth: "100%", // Don't exceed parent
          margin: 0, // Remove margin - parent handles spacing
          boxSizing: "border-box", // Include padding/border in width
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between", // A Blog App és Menu gombok közötti távolság
            width: "100%",
            boxSizing: "border-box",
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
        <List sx={{ display: "block" }}>
          {menuOptions.map((option, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={option.action}
                sx={{
                  backgroundColor: "#ffffff", // Fehér háttér
                  fontWeight: 600,
                  color: "#1a2b6d", // Sötétkék szöveg
                  borderRadius: "8px", // Lekerekített sarkok
                  marginBottom: "8px",
                  "&:hover": {
                    backgroundColor: "#e0e0e0", // Halvány szürke háttér hover esetén
                  },
                }}
              >
                <ListItemText primary={option.label} />
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