import type { JSX } from "react";
import PostDialog from "./PostDialog";

/**
 * Dialog component for creating new blog posts.
 * Sends POST request to the API with the blog post data.
 * Uses the PostDialog component for the UI.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Callback function to close the dialog
 * @param {Function} props.onPostCreated - Callback function called after successful post creation
 * @returns {JSX.Element} Create post dialog component
 */
const CreatePostDialog = ({
  open,
  onClose,
  onPostCreated,
}: {
  open: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}): JSX.Element => {
  const handleCreatePost = async (formData: { title: string; content: string }) => {
    const response = await fetch("http://localhost:5000/api/blogpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adds JWT token
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    // Notifies parent component
    onPostCreated();
  };

  return (
    <PostDialog
      open={open}
      onClose={onClose}
      onSubmit={handleCreatePost}
      dialogTitle="Create New Post"
    />
  );
};

export default CreatePostDialog;