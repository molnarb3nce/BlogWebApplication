using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.Models
{
    // Data Transfer Object for existing user login
    public class UserLoginDto
    {
        // User name for the account
        public required string UserName { get; set; }
        // Password for the account
        public required string Password { get; set; }
    }
}