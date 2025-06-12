using BlogApp.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Data
{
    public class BlogContext : IdentityDbContext<User>
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options) { }

        public DbSet<BlogPost> BlogPosts { get; set; }
    }
}