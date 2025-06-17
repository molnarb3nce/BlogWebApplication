import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography, Box } from "@mui/material";

const fetchBlogPostById = async (id: string) => {
  const response = await fetch(`http://localhost:5000/api/blogpost/${id}`);
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
      <Box
        sx={{
          backgroundColor: "#ffffff", // Fehér háttér
          borderRadius: "16px", // Lekerekített sarkok
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Árnyék
          padding: "24px", // Belső térköz
          marginTop: "16px", // Felső margó
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#1a2b6d", // Sötétkék szöveg
            fontWeight: 600,
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color: "#1a2b6d", // Sötétkék szöveg
            marginBottom: "16px",
          }}
        >
          {post.author} - {new Date(post.dateCreated).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#1a2b6d", // Sötétkék szöveg
          }}
        >
          {post.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default BlogPostPage;