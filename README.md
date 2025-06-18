# BlogWebApplication

## Overview

A fullstack blog management system built with **ASP.NET Core** backend API and **React** frontend. This application allows users to create, view, edit, and delete blog posts.

---

## System Architecture

This application follows a three-tier architecture:

- **Frontend:** React-based user interface  
- **Backend:** ASP.NET Core Web API  
- **Database:** SQL Server  

---

## Technologies

### Backend

- ASP.NET Core 8.0  
- Entity Framework Core  
- SQL Server  
- AutoMapper  
- JWT token authentication  

### Frontend

- React 18  
- React Router  
- Axios  
- Bootstrap 5  
- React Markdown  

---

## Project Structure

BlogWebApplication

├── backend/\
│ └── BlogApp/\
│ ├── BlogApp.API/ # ASP.NET Core Web API project\
│ ├── BlogApp.Core/ # Business logic and entities\
│ └── BlogApp.Tests/ # Unit tests\
├── frontend/ # React frontend application\
│ ├── public/ # Static files\
│ ├── src/ # Source code\
│ │ ├── components/ # Reusable components\
│ │ ├── pages/ # Page components\
│ │ ├── services/ # API services\
│ │ └── App.js # Main application component\
└── docker-compose.yml # Docker configuration (under development)

---

## Features

- User registration and login  
- Create, edit, and delete blog posts  
- List and view blog post details  
- Manage comments  
- Responsive user interface  

---

## Installation and Setup

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)  
- [Node.js v18+](https://nodejs.org/)  
- SQL Server or SQL Server Express  

---

### Running the Backend

1. Open a terminal and navigate to the backend project directory:
   ```bash
   cd backend/BlogApp/BlogApp.API
   dotnet run

The API will be available at https://localhost:5001 or http://localhost:5000 (check console output for the exact URL).

---

### Running the Frontend

1. Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend

2. Install the required npm packages:

   ```bash
    npm install

3. Start the development server:

   ```bash
    npm run dev

The frontend application will be available at http://localhost:3000.