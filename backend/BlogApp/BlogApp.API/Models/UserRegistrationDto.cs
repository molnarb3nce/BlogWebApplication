using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.Models
{
    // Data Transfer Object for new user registration
    public class UserRegistrationDto
    {
        // User name for the new account with a maximum length of 50 characters
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        // Email address for the new account which must be a valid email format
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        // Password for the new account with a minimum length of 6 characters and one uppercase letter and special character
        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        // First name of the user with a maximum length of 50 characters
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        // Last name of the user with a maximum length of 50 characters
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        // Age of the user which must be between 1 and 120
        [Required]
        [Range(1, 120)]
        public int Age { get; set; }
    }
}