import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";

const fetchBlogPosts = async () => {
  const response = await fetch("http://localhost:5000/api/blogpost");
  if (!response.ok) {
    throw new Error("Error fetching blog posts: " + response.statusText);
  }
  return response.json();
};

const MainPage = () => {
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