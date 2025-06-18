import { useState, useEffect } from "react";
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

const ProfilePage = () => {
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
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Fiók törlés megerősítő ablak
  const [isBlogConfirmDialogOpen, setIsBlogConfirmDialogOpen] = useState(false); // Blog törlés megerősítő ablak
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null); // Törlendő blog ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username is null or undefined.");
        }

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

    const fetchUserBlogs = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username is null or undefined.");
        }

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

  // Handle blog deletion
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
      setIsBlogConfirmDialogOpen(false); // Bezárjuk a megerősítő ablakot
      setBlogToDelete(null); // Törlendő blog ID törlése
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBlog = (blog: any) => {
    setSelectedBlog(blog);
    setIsPostDialogOpen(true);
  };

  const handlePostDialogClose = () => {
    setIsPostDialogOpen(false);
    setSelectedBlog(null);
  };

  const handlePostUpdated = (updatedBlog: any) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    handlePostDialogClose();
  };

  const handleConfirmDelete = () => {
    setIsConfirmDialogOpen(true); // Fiók törlés megerősítő ablak megnyitása
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false); // Fiók törlés megerősítő ablak bezárása
  };

  const handleBlogConfirmDelete = (blogId: string) => {
    setBlogToDelete(blogId); // Beállítjuk a törlendő blog ID-t
    setIsBlogConfirmDialogOpen(true); // Blog törlés megerősítő ablak megnyitása
  };

  const handleCancelBlogDelete = () => {
    setIsBlogConfirmDialogOpen(false); // Blog törlés megerősítő ablak bezárása
    setBlogToDelete(null); // Törlendő blog ID törlése
  };

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
        onClick={handleConfirmDelete} // Fiók törlés megerősítő ablak megnyitása
        sx={{
          backgroundColor: "#d32f2f", // Piros háttér
          color: "#ffffff", // Fehér szöveg
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#b71c1c", // Sötétebb piros hover állapotban
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
      {/* Megerősítő ablak */}
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

      {/* Blog törlés megerősítő ablak */}
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