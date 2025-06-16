import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("username"); // Retrieve username from localStorage

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
        const username = localStorage.getItem("username"); // Retrieve username from localStorage

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
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
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

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId)); // Remove the deleted blog from the list
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

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6" gutterBottom>
        Personal Data:
      </Typography>
      <Typography>Firstname: {userData.firstName}</Typography>
      <Typography>Lastname: {userData.lastName}</Typography>
      <Typography>Email: {userData.email}</Typography>
      <Typography>Age: {userData.age}</Typography>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h6" gutterBottom>
        My Blogs:
      </Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem
            key={blog.id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEditBlog(blog)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteBlog(blog.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={blog.title} secondary={blog.content.substring(0, 50) + "..."} />
          </ListItem>
        ))}
      </List>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h6" gutterBottom>
        Delete Account:
      </Typography>
      {deleteError && <Typography color="error">{deleteError}</Typography>}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={deleteCredentials.username}
        onChange={(e) => setDeleteCredentials({ ...deleteCredentials, username: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={deleteCredentials.password}
        onChange={(e) => setDeleteCredentials({ ...deleteCredentials, password: e.target.value })}
      />
      <Button variant="contained" color="error" fullWidth onClick={handleDeleteAccount}>
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
    </Container>
  );
};

export default ProfilePage;