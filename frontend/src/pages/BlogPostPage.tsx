import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography, Box } from "@mui/material";
import type { JSX } from "react";

// Fetches a single blog post by ID from the API
const fetchBlogPostById = async (id: string) => {
  const response = await fetch(`http://localhost:5000/api/blogpost/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

/**
 * Displays a full blog post with title, author, date, and complete content.
 * Fetches the blog post data based on the ID from the URL parameters.
 * Uses React Query for data fetching and state management.
 * 
 * @component
 * @returns {JSX.Element} Blog post page component
 */
const BlogPostPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blogPost", id],
    queryFn: () => fetchBlogPostById(id!),
  });

  if (isLoading) return <p>Loading post...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  // Renders the blog post details
  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          marginTop: "16px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#1a2b6d",
            fontWeight: 600,
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color: "#1a2b6d",
            marginBottom: "16px",
          }}
        >
          {post.author} - {new Date(post.dateCreated).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#1a2b6d",
          }}
        >
          {post.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default BlogPostPage;