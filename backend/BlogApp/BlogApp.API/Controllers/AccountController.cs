using BlogApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BlogApp.API.Controllers
{
    // Controller for user account management, including registration and login
    // Provides endpoints which handle user registration and login and generate JWT tokens for authenticated users
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        // Constructor to inject dependencies for user management and configuration
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        // Endpoint for registering a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto registrationDto)
        {
            var user = new User
            {
                UserName = registrationDto.Username,
                Email = registrationDto.Email,
                FirstName = registrationDto.FirstName,
                LastName = registrationDto.LastName,
                Age = registrationDto.Age
            };

            var result = await _userManager.CreateAsync(user, registrationDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User registered successfully.");
        }

        // Endpoint for user login and authentication via JWT tokens
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            // Validate the user credentials
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized("Invalid credentials.");
            }

            // Sign in the user and generate a JWT token for authenticated access
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            Console.WriteLine($"Debug: JWT Key = {BitConverter.ToString(key)}");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim("id", user.Id),
                    new System.Security.Claims.Claim("username", user.UserName)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            // Create the token and return it in the response
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { Token = tokenHandler.WriteToken(token) });
        }

        // Delete user by username and password
        [HttpDelete("delete")]
        [Authorize]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserDto deleteUserDto)
        {
            var user = await _userManager.FindByNameAsync(deleteUserDto.Username);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, deleteUserDto.Password);
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid password.");
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest("Failed to delete the user.");
            }

            return Ok("User deleted successfully.");
        }

        // Endpoint to retrieve account data by username
        [HttpGet("{username}")]
        [Authorize]
        public async Task<IActionResult> GetAccountByUsername(string username)
        {
            // Retrieve the user by username
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Map the user to the UserDetailsDto
            var accountData = new UserDetailsDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Age = user.Age
            };

            return Ok(accountData);
        }
    }
}