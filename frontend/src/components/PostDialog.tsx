import React, { useState, type JSX } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

// Props for the PostDialog component
interface PostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: { title: string; content: string }) => Promise<void>;
  initialData?: { title: string; content: string };
  dialogTitle: string;
}

/**
 * Reusable dialog component for creating or editing blog posts.
 * Provides form fields for title and content with validation.
 * Can be used for both creation and update operations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Callback function to close the dialog
 * @param {Function} props.onSubmit - Callback function to handle form submission
 * @param {Object} [props.initialData] - Initial data for editing mode
 * @param {string} [props.initialData.title] - Initial title
 * @param {string} [props.initialData.content] - Initial content
 * @param {string} props.dialogTitle - Title to display in the dialog
 * @returns {JSX.Element} Post dialog component
 */
const PostDialog: React.FC<PostDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData = { title: "", content: "" },
  dialogTitle,
}: PostDialogProps): JSX.Element => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState<string | null>(null);

  // Resets form data when dialog opens
  // and sets initial values if provided
  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  // Renders the dialog with form fields for title and content
  // Displays error messages if submission fails
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
        <Button onClick={onClose} sx={{ color: "#1a2b6d" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;