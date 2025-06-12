using BlogApp.API.Models;
using BlogApp.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostRepository _repository;

        public BlogPostController(IBlogPostRepository repository)
        {
            _repository = repository;
        }

        // GET /api/posts - Retrieve all posts
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _repository.GetAllAsync();
            return Ok(posts);
        }

        // GET /api/posts/{id} - Retrieve a specific post by ID
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

        // POST /api/posts - Create a new post
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
                Author = createBlogPostDto.Author,
                DateCreated = DateTime.Now
            };

            await _repository.AddAsync(blogPost);
            return CreatedAtAction(nameof(GetPostById), new { id = blogPost.Id }, blogPost);
        }

        // PUT /api/posts/{id} - Update a post
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] BlogPost blogPost)
        {
            if (id != blogPost.Id)
            {
                return BadRequest("Post ID mismatch");
            }

            var existingPost = await _repository.GetByIdAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            existingPost.Title = blogPost.Title;
            existingPost.Content = blogPost.Content;
            existingPost.Author = blogPost.Author;

            await _repository.UpdateAsync(existingPost);
            return NoContent();
        }

        // DELETE /api/posts/{id} - Delete a post
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