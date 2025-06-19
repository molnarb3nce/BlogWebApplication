using BlogApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Data
{
    // Class for initializing the database with sample blog posts
    public static class DbInitializer
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<BlogContext>();

            // Check if there are already blog posts in the database
            if (await context.BlogPosts.AnyAsync())
            {
                // Database already has posts, do nothing
                return;
            }

            // Sample blog posts
            var blogPosts = new List<BlogPost>
            {
                new BlogPost 
                {
                    Title = "My First Blog Post",
                    Content = "This is the content of my first blog post. Here would be a longer text introducing the topic.",
                    Author = "Anonymous Author",
                    AuthorId = "anonymous",
                    DateCreated = DateTime.Now.AddDays(-5)
                },
                new BlogPost 
                {
                    Title = "The Beauty of Programming",
                    Content = "Programming is an exciting journey where we transform our thoughts into code and bring our ideas to life.",
                    Author = "Anonymous Author",
                    AuthorId = "anonymous",
                    DateCreated = DateTime.Now.AddDays(-4)
                },
                new BlogPost 
                {
                    Title = "ASP.NET Core Development Basics",
                    Content = "ASP.NET Core is a modern, high-performance, cross-platform framework for building modern web applications.",
                    Author = "Anonymous Author",
                    AuthorId = "anonymous",
                    DateCreated = DateTime.Now.AddDays(-3)
                },
                new BlogPost 
                {
                    Title = "Database Management with Entity Framework Core",
                    Content = "Entity Framework Core allows us to easily manage databases from C# code without writing SQL queries directly.",
                    Author = "Anonymous Author",
                    AuthorId = "anonymous",
                    DateCreated = DateTime.Now.AddDays(-2)
                },
                new BlogPost 
                {
                    Title = "User Authentication and Identity",
                    Content = "Secure user management is essential in modern web applications. In this post, we'll look at how to implement it using ASP.NET Core Identity.",
                    Author = "Anonymous Author",
                    AuthorId = "anonymous",
                    DateCreated = DateTime.Now.AddDays(-1)
                }
            };

            // Add blog posts to database
            await context.BlogPosts.AddRangeAsync(blogPosts);
            await context.SaveChangesAsync();
        }
    }
}