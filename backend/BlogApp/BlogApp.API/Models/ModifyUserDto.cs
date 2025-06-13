using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.Models
{
    // Data Transfer Object for modifying an existing user
    public class ModifyUserDto
    {
        // First name of the user
        public string? FirstName { get; set; }

        // Last name of the user
        public string? LastName { get; set; }

        // Email address of the user
        [EmailAddress]
        public string? Email { get; set; }

        // Age of the user
        [Range(1, 120)]
        public int? Age { get; set; }
    }
}