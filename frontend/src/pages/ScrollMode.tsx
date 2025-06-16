import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";
import { motion } from "framer-motion";

const ScrollMode = () => {
  const [posts, setPosts] = useState<{ [key: number]: any }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

  // Fetch the total number of posts
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

  // Fetch a specific post by order ID
  const fetchPost = async (orderId: number) => {
    if (posts[orderId]) return; // Skip if the post is already cached

    try {
      const response = await fetch(`http://localhost:5000/api/BlogPost/order/${orderId}`);
      if (!response.ok) throw new Error(`Failed to fetch post at order ID ${orderId}`);
      const post = await response.json();
      setPosts((prevPosts) => ({ ...prevPosts, [orderId]: post }));
    } catch (error) {
      console.error(`Error fetching post at order ID ${orderId}:`, error);
    }
  };

  // Fetch the current, previous, and next posts
  useEffect(() => {
    fetchPost(currentIndex); // Fetch the current post
    if (currentIndex > 0) fetchPost(currentIndex - 1); // Fetch the previous post
    if (currentIndex < totalPosts - 1) fetchPost(currentIndex + 1); // Fetch the next post
  }, [currentIndex, totalPosts]);

  // Handle scroll events
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
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        key={currentIndex} // Ensure animation triggers when index changes
        initial={{ opacity: 0, y: scrollDirection === "down" ? 300 : -300 }} // Start position
        animate={{ opacity: 1, y: 0 }} // End position
        exit={{ opacity: 0, y: scrollDirection === "down" ? -300 : 300 }} // Exit position
        transition={{ duration: 0.5 }} // Animation duration
        style={{ width: "100%" }}
      >
        <BlogPostCard post={posts[currentIndex]} />
      </motion.div>
    </Container>
  );
};

export default ScrollMode;