import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogPostCard = ({ post }: { post: any }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: "300px", height: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography
          variant="h6"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: "8px",
          }}
        >
          {post.author} - {new Date(post.dateCreated).toLocaleDateString()}
        </Typography>

        <Typography
          variant="body1"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {post.content}
        </Typography>
      </CardContent>

      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button size="small" onClick={() => navigate(`/blogpost/${post.id}`)}>
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogPostCard;