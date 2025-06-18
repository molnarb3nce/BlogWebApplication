# Blog Backend API

## Overview

This project is an ASP.NET Core Web API that provides backend services for the Blog Web Application. The API handles blog posts, users, and comments, as well as authentication and authorization.

## Technologies

- **ASP.NET Core 8.0** - Modern, high-performance, cross-platform framework for creating APIs
- **Entity Framework Core** - ORM for managing SQL Server databases
- **JWT authentication** - Token-based user authentication
- **Identity** - Built-in user management system
- **Swagger/OpenAPI** - API documentation and testing

## Project structure

```
BlogApp.API/
├── Controllers/                # API controllers
│   ├── AccountController.cs    # User account management
│   └── BlogPostController.cs   # Blog post management
├── Data/                       # Database connection
│   └── BlogContext.cs          # EF Core DbContext
├── Migrations/                 # Database migrations
│   ├── 20250612111345_InitDb.cs            # Initial migration
│   ├── 20250618113120_FixDb.cs             # Database fixes
│   └── BlogContextModelSnapshot.cs         # Database schema snapshot
├── Models/                     # Data models
│   ├── BlogPost.cs             # Blog post entity
│   └── User.cs                 # User entity
├── Repositories/               # Repository pattern implementation
│   ├── BlogPostRepository.cs   # Blog post repository
│   ├── IBlogPostRepository.cs  # Repository interface
│   └── InMemoryRepository.cs   # Memory-based repository
├── Program.cs                  # Application entry point and configuration
├── appsettings.json            # Application settings
└── Dockerfile                  # Docker configuration
```

## API Endpoints

### Authentication

- **POST /api/account/register** - Register a new user
- **POST /api/account/login** - User login

### Blog posts

- **GET /api/blogpost** - List blog posts
- **GET /api/blogpost/{id}** - Retrieve data for a blog post
- **GET /api/blogpost/order/{id}** - Retrieve blog posts in order
- **POST /api/blogpost** - Create a new blog post (login required)
- **PUT /api/blogpost/{id}** - Edit blog post (login required)
- **DELETE /api/blogpost/{id}** - Delete blog post (login required)

## Database configuration

The project uses Entity Framework Core to communicate with the SQL Server database. The database connection can be configured in the `appsettings.json` file.

## Authentication and Authorization

The API uses ASP.NET Core Identity and JWT (JSON Web Token) based authentication. After successful login, the client receives a token, which must be sent in the Authorization header in subsequent requests:

```
Authorization: Bearer [token]
```