import { useQuery } from "@tanstack/react-query";
import { Container, GridLegacy as Grid } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";
import type { JSX } from "react";

// Fetches all blog posts from the API
// Returns a promise with the JSON response which contains an array of blog posts
const fetchBlogPosts = async () => {
  const response = await fetch("http://localhost:5000/api/blogpost");
  if (!response.ok) {
    throw new Error("Error fetching blog posts: " + response.statusText);
  }
  return response.json();
};

/**
 * Main page component that displays a grid of blog posts.
 * Fetches all blog posts from the API.
 * Uses React Query for data fetching and state management.
 * 
 * @component
 * @returns {JSX.Element} Main page component with blog post grid
 */
const MainPage = (): JSX.Element => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Grid container spacing={3}>
        {posts.map((post: any) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <BlogPostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainPage;