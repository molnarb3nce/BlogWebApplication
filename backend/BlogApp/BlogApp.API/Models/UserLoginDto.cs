using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.Models
{
    // Data Transfer Object for existing user login
    public class UserLoginDto
    {
        // User name for the account
        [Required]
        public string UserName { get; set; }
        // Password for the account
        [Required]
        public string Password { get; set; }
    }
}