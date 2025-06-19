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
- ASP.NET Core Identity  
- JWT token authentication  

### Frontend

- React 18  
- React Router  
- Material UI  
- Tanstack Query

---

## Project Structure

BlogWebApplication
```
├── backend/
│ └── BlogApp/
│ ├── BlogApp.API/ # ASP.NET Core Web API project
│ ├── BlogApp.Core/ # Business logic and entities
│ └── BlogApp.Tests/ # Unit tests
├── frontend/ # React frontend application
│ ├── public/ # Static files
│ ├── src/ # Source code
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── services/ # API services
│ │ └── App.js # Main application component
└── docker-compose.yml # Docker configuration (under development)
```
---

## Features

- User registration and login  
- Create, edit, and delete blog posts  
- List and view blog post details  
- Manage comments  
- Responsive user interface  

---

## Installation and Setup

### Running with Docker

The project includes a Docker configuration that makes it easy to run the entire application:

1. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

2. Open a terminal in the project's root directory and run:

```bash
   docker-compose up --build
```

3. The parts of the application will become available:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - SQL Server: localhost:1433 (user: sa, password: YourPassword123)

4. To stop the application, press `Ctrl+C` and then run:

```bash
   docker-compose down -v
```

## Using the Application

After successfully running the application, you can:

1. **Browse the Blog**: The homepage displays all blog posts with a clean card-based interface.

2. **Sample Content**: The application automatically initializes the database with 5 sample blog posts assigned to the admin user, so you can immediately see content without creating any.

3. **User Registration and Login**: 
   - Click on "Register" to create a new account
     - Required fields:
       - Username: Choose a unique username (3-20 characters)
       - Email: Provide a valid email format (e.g., user@example.com)
       - First Name: Your first name (2-50 characters)
       - Last Name: Your last name (2-50 characters)
       - Age: Enter your age
       - Password: Create a strong password (minimum 6 characters, must include at least one uppercase letter, one lowercase letter, one number, and one special character)
   - Click on "Login" to access your existing account


4. **Creating Posts**: Once logged in, you can create new blog posts using the "Create Post" button.

5. **Managing Posts**: As the author of a post, you can edit or delete your own posts.

## Database Initialization

The application uses a database initializer that automatically creates sample blog posts when you first run the application. This helps you to:

- Immediately see how the application looks with content
- Test the blog browsing functionality without creating posts manually
- Understand the post structure and formatting

The sample posts are created only if no posts exist in the database, so your content won't be overwritten after the first run.

## Unit Tests

The project includes comprehensive unit tests for the BlogPost repository operations:

-   **Create**: Tests adding new blog posts
-   **GetById**: Tests retrieving posts by ID (existing and non-existing)
-   **GetAll**: Tests retrieving all posts with various scenarios
-   **Update**: Tests post updating functionality
-   **Delete**: Tests post deletion functionality

## Running Tests

### Using Visual Studio:

1.  Open the solution in Visual Studio
2.  Open Test Explorer: `Test > Test Explorer`
3.  Click `Run All Tests` button

### Using Command Line:

1. Navigate to the test project directory

```bash
   cd backend/BlogApp/BlogApp.API.Tests
```

2. Run all tests

```bash
   dotnet test
```