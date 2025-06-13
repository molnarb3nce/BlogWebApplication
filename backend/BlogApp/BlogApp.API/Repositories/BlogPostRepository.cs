using BlogApp.API.Data;
using BlogApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Repositories
{
    // A Repository implementation for managing blog posts
    // Provides methods for CRUD operations on blog posts
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly BlogContext _context;

        public BlogPostRepository(BlogContext context)
        {
            _context = context;
        }

        // Retrieves all blog posts from the database
        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await _context.BlogPosts.ToListAsync();
        }

        // Retrieves a specific blog post by its ID
        public async Task<BlogPost?> GetByIdAsync(int id)
        {
            return await _context.BlogPosts.FindAsync(id);
        }

        // Adds a new blog post to the database
        public async Task AddAsync(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();
        }

        // Updates an existing blog post in the database
        public async Task UpdateAsync(BlogPost blogPost)
        {
            _context.BlogPosts.Update(blogPost);
            await _context.SaveChangesAsync();
        }

        // Deletes a blog post from the database by its ID
        public async Task DeleteAsync(int id)
        {
            var blogPost = await GetByIdAsync(id);
            if (blogPost != null)
            {
                _context.BlogPosts.Remove(blogPost);
                await _context.SaveChangesAsync();
            }
        }
    }
}