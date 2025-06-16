using BlogApp.API.Models;
using BlogApp.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public BlogPostController(IBlogPostRepository repository, UserManager<User> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        // Get the total number of posts
        [HttpGet("count")]
        public async Task<IActionResult> GetPostCount()
        {
            var posts = await _repository.GetAllAsync();
            var postCount = posts.Count();

            return Ok(postCount);
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

        // Endpoint to retrieve a post by its order index
        [HttpGet("order/{index}")]
        public async Task<IActionResult> GetPostByOrder(int index)
        {
            var posts = await _repository.GetAllAsync();
            var orderedPosts = posts.OrderBy(post => post.DateCreated).ToList();

            if (index < 0 || index >= orderedPosts.Count)
            {
                return NotFound("No post found at the specified index.");
            }

            var post = orderedPosts[index];
            return Ok(post);
        }

        // Retrieves all posts by a specific user
        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetPostsByUser(string userId)
        {
            var posts = await _repository.GetAllAsync();
            var userPosts = posts.Where(post => post.AuthorId == userId);

            if (!userPosts.Any())
            {
                return NotFound("No posts found for this user.");
            }

            return Ok(userPosts);
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

            // Get the currently logged-in user's ID
            var userId = User.FindFirst("id")?.Value;
            if (userId == null)
            {
                return Unauthorized("User is not authenticated.");
            }

            // Retrieve the user from the database
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            // Determine the author name
            string author = "Anonymous Author";
            if (!string.IsNullOrWhiteSpace(user.FirstName) && !string.IsNullOrWhiteSpace(user.LastName))
            {
                author = $"{user.FirstName} {user.LastName}";
            }
            else if (!string.IsNullOrWhiteSpace(user.FirstName))
            {
                author = user.FirstName;
            }
            else if (!string.IsNullOrWhiteSpace(user.LastName))
            {
                author = user.LastName;
            }

            // Create the blog post
            var blogPost = new BlogPost
            {
                Title = createBlogPostDto.Title,
                Content = createBlogPostDto.Content,
                Author = author,
                AuthorId = userId,
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