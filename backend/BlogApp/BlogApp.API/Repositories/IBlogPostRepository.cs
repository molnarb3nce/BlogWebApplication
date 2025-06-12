using BlogApp.API.Models;

namespace BlogApp.API.Repositories
{
    // Interface to implement Repository pattern in the Blog application
    // Defines methods for CRUD operations on BlogPost entities
    public interface IBlogPostRepository
    {
        // Retrieves all blog posts
        Task<IEnumerable<BlogPost>> GetAllAsync();
        // Retrieves a blog post by its ID
        Task<BlogPost?> GetByIdAsync(int id);
        // Adds a new blog post
        Task AddAsync(BlogPost blogPost);
        // Updates an existing blog post
        Task UpdateAsync(BlogPost blogPost);
        // Deletes an existing blog post by its ID
        Task DeleteAsync(int id);
    }
}