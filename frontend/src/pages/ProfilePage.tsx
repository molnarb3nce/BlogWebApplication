import { useState, useEffect, type JSX } from "react";
import {
  Typography,
  TextField,
  Button,
  Divider,
  GridLegacy as Grid,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostDialog from "../components/PostDialog";

/**
 * User profile page component that displays and manages user data and blog posts.
 * Features:
 * - Shows user personal information
 * - Lists user's blog posts with edit and delete options
 * - Provides account deletion functionality
 * - Includes confirmation dialogs for destructive actions
 * 
 * @component
 * @returns {JSX.Element} Profile page component
 */
const ProfilePage = (): JSX.Element => {
  const [userData, setUserData] = useState({
    firstName: "Unknown",
    lastName: "Unknown",
    email: "Unknown",
    age: "Unknown",
  });
  const [blogs, setBlogs] = useState<any[]>([]);
  const [deleteCredentials, setDeleteCredentials] = useState({ username: "", password: "" });
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isBlogConfirmDialogOpen, setIsBlogConfirmDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  // Fetches user data and blogs on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username is null or undefined.");
        }
        // Fetches user data from the API based on the stored username
        const response = await fetch(`http://localhost:5000/api/account/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetches user's blog posts from the API
    const fetchUserBlogs = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username is null or undefined.");
        }
        // Fetches blogs for the user based on the stored username
        const response = await fetch(`http://localhost:5000/api/blogpost/user/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchUserBlogs();
  }, []);

  // Handles account deletion
  // Sends a DELETE request to the API with the user's credentials
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/account/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(deleteCredentials),
      });

      if (!response.ok) {
        throw new Error("Failed to delete account. Please check your credentials.");
      }

      alert("Account deleted successfully!");
      localStorage.clear();
      window.location.href = "/";
    } catch (error: any) {
      setDeleteError(error.message);
    }
  };

  // Handles blog deletion
  // Sends a DELETE request to the API to delete the specified blog post by ID
  const handleDeleteBlog = async (blogId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogpost/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post.");
      }

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete));
      setIsBlogConfirmDialogOpen(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Handles blog editing
  const handleEditBlog = (blog: any) => {
    setSelectedBlog(blog);
    setIsPostDialogOpen(true);
  };

  // Closes the post dialog and resets selected blog
  const handlePostDialogClose = () => {
    setIsPostDialogOpen(false);
    setSelectedBlog(null);
  };

  // Handles post update after editing
  const handlePostUpdated = (updatedBlog: any) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    handlePostDialogClose();
  };

  // Opens the confirmation dialog for account deletion
  const handleConfirmDelete = () => {
    setIsConfirmDialogOpen(true);
  };

  // Closes the confirmation dialog for account deletion
  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
  };

  // Opens the confirmation dialog for blog deletion
  const handleBlogConfirmDelete = (blogId: string) => {
    setBlogToDelete(blogId);
    setIsBlogConfirmDialogOpen(true);
  };

  // Closes the confirmation dialog for blog deletion
  const handleCancelBlogDelete = () => {
    setIsBlogConfirmDialogOpen(false);
    setBlogToDelete(null);
  };

  // Renders the profile page with user data, blogs, and action buttons
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ color: "#1a2b6d", fontWeight: 600 }}>
        Profile
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "#1a2b6d", fontWeight: 500 }}>
        Personal Data:
      </Typography>
      <Typography sx={{ color: "#1a2b6d" }}>Firstname: {userData.firstName}</Typography>
      <Typography sx={{ color: "#1a2b6d" }}>Lastname: {userData.lastName}</Typography>
      <Typography sx={{ color: "#1a2b6d" }}>Email: {userData.email}</Typography>
      <Typography sx={{ color: "#1a2b6d" }}>Age: {userData.age}</Typography>

      <Divider sx={{ margin: "20px 0" }} />

      <Typography variant="h6" gutterBottom sx={{ color: "#1a2b6d", fontWeight: 500 }}>
        My Blogs:
      </Typography>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a2b6d" }}>
                {blog.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#1a2b6d", marginBottom: "16px" }}>
                Created: {new Date(blog.dateCreated).toLocaleDateString()}
              </Typography>

              {/* Action buttons */}
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <IconButton onClick={() => handleEditBlog(blog)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleBlogConfirmDelete(blog.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ margin: "20px 0" }} />

      <Typography variant="h6" gutterBottom sx={{ color: "#1a2b6d", fontWeight: 500 }}>
        Delete Account:
      </Typography>
      {deleteError && <Typography color="error">{deleteError}</Typography>}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={deleteCredentials.username}
        onChange={(e) => setDeleteCredentials({ ...deleteCredentials, username: e.target.value })}
        sx={{
          backgroundColor: "#inherit",
          borderRadius: "8px",
        }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={deleteCredentials.password}
        onChange={(e) => setDeleteCredentials({ ...deleteCredentials, password: e.target.value })}
        sx={{
          backgroundColor: "#inherit",
          borderRadius: "8px",
        }}
      />
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={handleConfirmDelete}
        sx={{
          backgroundColor: "#d32f2f",
          color: "#ffffff",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#b71c1c",
          },
        }}
      >
        Delete Account
      </Button>

      {/* PostDialog for Editing */}
      {selectedBlog && (
        <PostDialog
          open={isPostDialogOpen}
          onClose={handlePostDialogClose}
          onSubmit={async (formData) => {
            const response = await fetch(`http://localhost:5000/api/blogpost/${selectedBlog.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(formData),
            });

            if (!response.ok) {
              throw new Error("Failed to update blog post.");
            }

            const updatedBlog = await response.json();
            handlePostUpdated(updatedBlog);
          }}
          initialData={selectedBlog}
          dialogTitle="Edit Blog Post"
        />
      )}
      {/* Confirmation dialog for account deletion */}
      <Dialog open={isConfirmDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle sx={{ color: "#1a2b6d" }}>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#1a2b6d" }}>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} sx={{ color: "#1a2b6d" }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation dialog for blog deletion */}
      <Dialog open={isBlogConfirmDialogOpen} onClose={handleCancelBlogDelete}>
        <DialogTitle sx={{ color: "#1a2b6d" }}>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#1a2b6d" }}>
            Are you sure you want to delete this blog post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelBlogDelete} sx={{ color: "#1a2b6d" }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (blogToDelete) handleDeleteBlog(blogToDelete);
            }}
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePage;