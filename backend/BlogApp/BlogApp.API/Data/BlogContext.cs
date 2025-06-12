using BlogApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options) { }

        public DbSet<BlogPost> BlogPosts { get; set; }
    }
}