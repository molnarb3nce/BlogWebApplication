using BlogApp.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Data
{
    // This is the database context for the blog application
    // It integrates ASP.NET Core Identity for user management
    public class BlogContext : IdentityDbContext<User>
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options) { }

        public DbSet<BlogPost> BlogPosts { get; set; }

        // This is a method to reset the database and reseed the identity column
        public async Task ResetDatabaseAsync()
        {
            await Database.EnsureDeletedAsync();

            await Database.EnsureCreatedAsync();

            await Database.ExecuteSqlRawAsync("DBCC CHECKIDENT ('BlogPosts', RESEED, 0)");
        }
    }
}