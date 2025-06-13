using BlogApp.API.Models;
using BlogApp.API.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApp.API.Repositories
{
    public class InMemoryRepository : IBlogPostRepository
    {
        private readonly List<BlogPost> _blogPosts = new();

        public Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return Task.FromResult(_blogPosts.AsEnumerable());
        }

        public Task<BlogPost?> GetByIdAsync(int id)
        {
            var blogPost = _blogPosts.FirstOrDefault(bp => bp.Id == id);
            return Task.FromResult(blogPost);
        }

        public Task AddAsync(BlogPost blogPost)
        {
            blogPost.Id = _blogPosts.Count > 0 ? _blogPosts.Max(bp => bp.Id) + 1 : 1;
            _blogPosts.Add(blogPost);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(BlogPost blogPost)
        {
            var existingPost = _blogPosts.FirstOrDefault(bp => bp.Id == blogPost.Id);
            if (existingPost != null)
            {
                existingPost.Title = blogPost.Title;
                existingPost.Content = blogPost.Content;
                existingPost.Author = blogPost.Author;
                existingPost.DateCreated = blogPost.DateCreated;
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(int id)
        {
            var blogPost = _blogPosts.FirstOrDefault(bp => bp.Id == id);
            if (blogPost != null)
            {
                _blogPosts.Remove(blogPost);
            }
            return Task.CompletedTask;
        }
    }
}
