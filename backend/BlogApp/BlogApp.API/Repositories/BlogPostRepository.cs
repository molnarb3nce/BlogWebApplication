using BlogApp.API.Data;
using BlogApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Repositories
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly BlogContext _context;

        public BlogPostRepository(BlogContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await _context.BlogPosts.ToListAsync();
        }

        public async Task<BlogPost?> GetByIdAsync(int id)
        {
            return await _context.BlogPosts.FindAsync(id);
        }

        public async Task AddAsync(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(BlogPost blogPost)
        {
            _context.BlogPosts.Update(blogPost);
            await _context.SaveChangesAsync();
        }

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