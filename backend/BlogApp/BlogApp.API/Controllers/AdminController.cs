using BlogApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly BlogContext _context;

        public AdminController(BlogContext context)
        {
            _context = context;
        }

        // Endpoint to reset the database
        [HttpPost("reset-database")]
        [Authorize]
        public async Task<IActionResult> ResetDatabase()
        {
            await _context.ResetDatabaseAsync();
            return Ok("Database has been reset and identity reseeded.");
        }
    }
}