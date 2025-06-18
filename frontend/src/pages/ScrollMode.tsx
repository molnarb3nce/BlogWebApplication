import { useState, useEffect, type JSX } from "react";
import { Box } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";
import { motion } from "framer-motion";

/**
 * Alternative blog viewing mode for narrower screens.
 * Shows one blog post at a time and allows scrolling through posts.
 * Implements smooth animations during transitions between posts.
 * Lazy-loads blog posts as needed based on scroll direction.
 * 
 * @component
 * @returns {JSX.Element} Scroll mode component
 */
const ScrollMode = (): JSX.Element => {
  const [posts, setPosts] = useState<{ [key: number]: any }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

  // Fetches the total number of posts
  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/BlogPost/count");
        if (!response.ok) throw new Error("Failed to fetch post count");
        const count = await response.json();
        setTotalPosts(count);
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    };

    fetchTotalPosts();
  }, []);

  // Fetches a specific post by order ID
  const fetchPost = async (orderId: number) => {
    if (posts[orderId]) return;

    try {
      const response = await fetch(`http://localhost:5000/api/BlogPost/order/${orderId}`);
      if (!response.ok) throw new Error(`Failed to fetch post at order ID ${orderId}`);
      const post = await response.json();
      setPosts((prevPosts) => ({ ...prevPosts, [orderId]: post }));
    } catch (error) {
      console.error(`Error fetching post at order ID ${orderId}:`, error);
    }
  };

  // Fetches the current, previous, and next posts
  useEffect(() => {
    fetchPost(currentIndex);
    if (currentIndex > 0) fetchPost(currentIndex - 1);
    if (currentIndex < totalPosts - 1) fetchPost(currentIndex + 1);
  }, [currentIndex, totalPosts]);

  // Handles scroll events
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && currentIndex < totalPosts - 1) {
        setScrollDirection("down");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        setScrollDirection("up");
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentIndex, totalPosts]);

  if (!posts[currentIndex]) {
    return <p>Loading post...</p>;
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        boxSizing: "border-box",
        padding: "16px",
      }}
    >
      {/* Animates the post container, ensures smooth transitions */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: scrollDirection === "down" ? 300 : -300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: scrollDirection === "down" ? -300 : 300 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <BlogPostCard post={posts[currentIndex]} />
      </motion.div>
    </Box>
  );
};

export default ScrollMode;