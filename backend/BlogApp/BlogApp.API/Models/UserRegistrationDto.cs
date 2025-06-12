using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.Models
{
    public class UserRegistrationDto
    {
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [Range(1, 120)]
        public int Age { get; set; }
    }
}