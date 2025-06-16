import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

interface PostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: { title: string; content: string }) => Promise<void>;
  initialData?: { title: string; content: string }; // For updating posts
  dialogTitle: string; // Title of the dialog (e.g., "Create Post" or "Update Post")
}

const PostDialog: React.FC<PostDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData = { title: "", content: "" },
  dialogTitle,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await onSubmit(formData); // Call the parent-provided submit function
      onClose(); // Close the dialog on success
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          label="Content"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;