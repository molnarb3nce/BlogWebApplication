import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography } from "@mui/material";

const fetchBlogPostById = async (id: string) => {
  const response = await fetch(`https://localhost:5000/api/blogpost/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blogPost", id],
    queryFn: () => fetchBlogPostById(id!),
  });

  if (isLoading) return <p>Loading post...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {post.author} - {new Date(post.dateCreated).toLocaleDateString()}
      </Typography>
      <Typography variant="body1">{post.content}</Typography>
    </Container>
  );
};

export default BlogPostPage;