import { useState, type JSX } from "react";
import { AppBar, Toolbar, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CreatePostDialog from "./CreatePostDialog";

/**
 * Navigation bar component that provides access to main application features.
 * Shows different options based on authentication state.
 * Includes a sidebar menu for profile page view and create post functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated
 * @param {Function} props.onLogout - Callback function for logout action
 * @returns {JSX.Element} Navigation bar component
 */
const Navbar = ({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Toggles the sidebar open/close state
  const toggleSidebar = (open: boolean) => {
    setIsSidebarOpen(open);
  };

  // Opens the create post dialog and closes the sidebar
  const handleCreatePostOpen = () => {
    setIsCreatePostOpen(true);
    toggleSidebar(false);
  };

  // Closes the create post dialog
  const handleCreatePostClose = () => {
    setIsCreatePostOpen(false);
  };

  // Callback function to handle post creation success
  // Invalidates the blog posts query to refresh the list after a new post is created
  const handlePostCreated = () => {
    console.log("Post created successfully!");
    queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
  };

  // Menu options based on authentication state
  // If authenticated, profile, create post, and logout options are available
  // If not authenticated, login and register options are available
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
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "100%",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "#1a2b6d",
              fontWeight: 600,
              fontSize: "1.25rem",
              textTransform: "none",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            Blog App
          </Button>
          <Button
            onClick={() => toggleSidebar(true)}
            sx={{
              color: "#1a2b6d",
              fontWeight: 600,
              fontSize: "1.25rem",
              textTransform: "none",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            Menu
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => toggleSidebar(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            width: "250px",
            padding: "16px",
          },
        }}
      >
        <List sx={{ display: "block" }}>
          {menuOptions.map((option, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={option.action}
                sx={{
                  backgroundColor: "#ffffff",
                  fontWeight: 600,
                  color: "#1a2b6d",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* Create Post Dialog */}
      <CreatePostDialog
        open={isCreatePostOpen}
        onClose={handleCreatePostClose}
        onPostCreated={handlePostCreated}
      />
    </>
  );
};

export default Navbar;