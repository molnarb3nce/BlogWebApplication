import PostDialog from "./PostDialog";

const CreatePostDialog = ({
  open,
  onClose,
  onPostCreated,
}: {
  open: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}) => {
  const handleCreatePost = async (formData: { title: string; content: string }) => {
    const response = await fetch("http://localhost:5000/api/blogpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    onPostCreated(); // Notify parent component
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