import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";

const ScrollMode = () => {
  const [posts, setPosts] = useState<{ [key: number]: any }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  // Fetch the total number of posts
  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        console.log("Fetching total number of posts...");
        const response = await fetch("http://localhost:5000/api/BlogPost/count");
        console.log("Response status (total posts):", response.status);
        if (!response.ok) throw new Error("Failed to fetch post count");
        const count = await response.json();
        console.log("Total posts fetched:", count);
        setTotalPosts(count);
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    };

    fetchTotalPosts();
  }, []);

  // Fetch a specific post by order ID
  const fetchPost = async (orderId: number) => {
    if (posts[orderId]) {
      console.log(`Post at order ID ${orderId} is already cached.`);
      return; // Skip if the post is already cached
    }

    try {
      console.log(`Fetching post at order ID ${orderId}...`);
      const response = await fetch(`http://localhost:5000/api/BlogPost/order/${orderId}`);
      console.log(`Response status (post ${orderId}):`, response.status);
      if (!response.ok) throw new Error(`Failed to fetch post at order ID ${orderId}`);
      const post = await response.json();
      console.log(`Post fetched at order ID ${orderId}:`, post);
      setPosts((prevPosts) => ({ ...prevPosts, [orderId]: post }));
    } catch (error) {
      console.error(`Error fetching post at order ID ${orderId}:`, error);
    }
  };

  // Fetch the current, previous, and next posts
  useEffect(() => {
    console.log("Current index:", currentIndex);
    fetchPost(currentIndex); // Fetch the current post
    if (currentIndex > 0) {
      console.log("Fetching previous post...");
      fetchPost(currentIndex - 1); // Fetch the previous post
    }
    if (currentIndex < totalPosts - 1) {
      console.log("Fetching next post...");
      fetchPost(currentIndex + 1); // Fetch the next post
    }
  }, [currentIndex, totalPosts]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      console.log("Scroll event detected:", event.deltaY);
      if (event.deltaY > 0 && currentIndex < totalPosts - 1) {
        console.log("Scrolling down...");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        console.log("Scrolling up...");
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      console.log("Removing scroll event listener...");
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentIndex, totalPosts]);

  if (!posts[currentIndex]) {
    console.log("Loading current post...");
    return <p>Loading post...</p>;
  }

  console.log("Rendering post at index:", currentIndex);

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
      <BlogPostCard post={posts[currentIndex]} />
    </Container>
  );
};

export default ScrollMode;