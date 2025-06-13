using BlogApp.API.Data;
using BlogApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BlogApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly BlogContext _context;
        private readonly UserManager<User> _userManager;

        public AdminController(BlogContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Endpoint to reset the database
        [HttpPost("reset-database")]
        [Authorize]
        public async Task<IActionResult> ResetDatabase()
        {
            await _context.ResetDatabaseAsync();
            return Ok("Database has been reset and identity reseeded.");
        }

        // Get all users
        [HttpGet("users")]
        [Authorize]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }

        // Modify a user by ID
        [HttpPut("users/{id}")]
        [Authorize]
        public async Task<IActionResult> ModifyUser(string id, [FromBody] ModifyUserDto modifyUserDto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Update only the fields that are provided in the request body
            if (!string.IsNullOrWhiteSpace(modifyUserDto.FirstName))
            {
                user.FirstName = modifyUserDto.FirstName;
            }

            if (!string.IsNullOrWhiteSpace(modifyUserDto.LastName))
            {
                user.LastName = modifyUserDto.LastName;
            }

            if (!string.IsNullOrWhiteSpace(modifyUserDto.Email))
            {
                user.Email = modifyUserDto.Email;
            }

            if (modifyUserDto.Age.HasValue)
            {
                user.Age = modifyUserDto.Age.Value;
            }

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User updated successfully.");
        }

        // Delete a user by ID
        [HttpDelete("users/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User deleted successfully.");
        }
    }
}