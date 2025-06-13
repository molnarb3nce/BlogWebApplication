using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.Models
{
    // Data Transfer Object for new user registration
    public class UserRegistrationDto
    {
        // User name for the new account with a maximum length of 50 characters
        [MaxLength(50)]
        public required string Username { get; set; }

        // Email address for the new account which must be a valid email format
        [EmailAddress]
        public required string Email { get; set; }

        // Password for the new account with a minimum length of 6 characters and one uppercase letter and special character
        [MinLength(6)]
        public required string Password { get; set; }

        // First name of the user with a maximum length of 50 characters
        [MaxLength(50)]
        public string FirstName { get; set; } = "Unknown";

        // Last name of the user with a maximum length of 50 characters
        [MaxLength(50)]
        public string LastName { get; set; } = "Unknown";

        // Age of the user which must be between 1 and 120
        [Range(1, 120)]
        public required int Age { get; set; }
    }
}