import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Displays a blog post in a card format with title, author, date, and content preview.
 * Provides a link to the full blog post view.
 * Includes hover animations and styling.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.post - Blog post data
 * @param {string} props.post.id - Blog post ID
 * @param {string} props.post.title - Blog post title
 * @param {string} props.post.author - Blog post author
 * @param {string} props.post.dateCreated - Blog post creation date
 * @param {string} props.post.content - Blog post content
 * @returns {JSX.Element} Blog post card component
 */
const BlogPostCard = ({ post }: { post: any }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "300px",
        height: "250px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: "#1a2b6d",
            fontWeight: 600,
            marginBottom: "4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#4b9fe1",
            marginBottom: "16px",
          }}
        >
          {post.author} - {new Date(post.dateCreated).toLocaleDateString()}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#1a2b6d",
            marginBottom: "8px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.content}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", marginTop: "auto", padding: "8px 16px 16px" }}>
        <Button
          size="small"
          onClick={() => navigate(`/blogpost/${post.id}`)}
          sx={{
            backgroundColor: "#1a2b6d",
            color: "#ffffff",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#4b9fe1",
            },
          }}
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogPostCard;