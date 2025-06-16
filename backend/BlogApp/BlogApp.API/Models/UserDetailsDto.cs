namespace BlogApp.API.Models
{
    // Data Transfer Object for returning user account details
    public class UserDetailsDto
    {
        // Unique identifier for the user
        public required string Id { get; set; }

        // Username of the user
        public required string UserName { get; set; }

        // Email address of the user
        public string? Email { get; set; }

        // First name of the user
        public string? FirstName { get; set; }

        // Last name of the user
        public string? LastName { get; set; }

        // Age of the user
        public int? Age { get; set; }
    }
}
