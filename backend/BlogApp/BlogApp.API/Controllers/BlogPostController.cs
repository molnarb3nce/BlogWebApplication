using BlogApp.API.Models;
using BlogApp.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogApp.API.Controllers
{
    // This controller handles CRUD operations for blog posts
    // Provides endpoints to create, read, update, and delete blog posts
    [ApiController]
    [Route("api/[controller]")]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostRepository _repository;

        public BlogPostController(IBlogPostRepository repository)
        {
            _repository = repository;
        }

        // Retrievee all posts
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _repository.GetAllAsync();
            return Ok(posts);
        }

        // Retrieves a specific post by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _repository.GetByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // Creates a new post
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] CreateBlogPostDto createBlogPostDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var blogPost = new BlogPost
            {
                Title = createBlogPostDto.Title,
                Content = createBlogPostDto.Content,
                Author = string.IsNullOrWhiteSpace(createBlogPostDto.Author) ? "Anonymous Author" : createBlogPostDto.Author,
                DateCreated = DateTime.Now
            };

            await _repository.AddAsync(blogPost);
            return CreatedAtAction(nameof(GetPostById), new { id = blogPost.Id }, blogPost);
        }

        // Updates a post
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] UpdateBlogPostDto updateBlogPostDto)
        {
            if (updateBlogPostDto == null)
            {
                return BadRequest("Request body cannot be null.");
            }

            var existingPost = await _repository.GetByIdAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            // Update only the fields that are not null or empty
            if (!string.IsNullOrWhiteSpace(updateBlogPostDto.Title))
            {
                existingPost.Title = updateBlogPostDto.Title;
            }

            if (!string.IsNullOrWhiteSpace(updateBlogPostDto.Content))
            {
                existingPost.Content = updateBlogPostDto.Content;
            }

            if (!string.IsNullOrWhiteSpace(updateBlogPostDto.Author))
            {
                existingPost.Author = updateBlogPostDto.Author;
            }

            await _repository.UpdateAsync(existingPost);
            return Ok(existingPost);
        }

        // Deletes a post
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _repository.GetByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}