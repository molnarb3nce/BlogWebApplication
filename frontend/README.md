# Blog Frontend

## Overview

This React-based frontend serves as the user interface for the Blog Web Application. It provides a modern, responsive interface for managing and viewing blog posts.

---

## Technologies

- **React 18** – Modern JavaScript library for building user interfaces  
- **React Router** – Client-side routing  
- **Material UI** – Component library and style system
- **Tanstack Query** – Data management and server status management  

---

## Project Structure

```
frontend/
├── public/              # Static files
│   └── index.html       # HTML entry point
├── src/                 # Source code
│   ├── components/      # Reusable components
│   │   ├── BlogPostCard.tsx             # Blog card component
│   │   ├── CreateEditPostModal.tsx      # Create/edit blog
│   │   ├── FloatingShapesBackground.tsx # Animated background
│   │   └── Navbar.tsx                   # Navigation bar
│   ├── pages/          # Page components
│   │   ├── BlogList.tsx       # List blog posts
│   │   ├── BlogPostPage.tsx   # Blog post details
│   │   ├── LoginPage.tsx      # Login
│   │   ├── RegisterPage.tsx   # Registration
│   │   └── ScrollMode.tsx     # Scroll mode
│   ├── App.tsx         # Main application component
│   ├── index.css       # Global CSS
│   └── main.tsx        # Entry point
├── eslint.config.js    # ESLint configuration
├── index.html          # Entry HTML file
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tsconfig.node.json  # Node.js TypeScript configuration
├── vite.config.ts      # Vite configuration
└── Dockerfile          # Docker configuration
```

---

## Features

- User registration and login  
- Listing and filtering blog posts  
- Viewing blog posts in detail  
- Creating, editing, and deleting blog posts (for logged-in users)  
- Managing comments  
- Responsive user interface for different devices