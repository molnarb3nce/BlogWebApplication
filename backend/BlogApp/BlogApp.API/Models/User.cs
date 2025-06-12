using Microsoft.AspNetCore.Identity;

namespace BlogApp.API.Models
{
    // Represents a user in the application and an entity in the database
    // Inherits from IdentityUser to include properties for user management
    public class User : IdentityUser
    {
        // First name of the user
        public string FirstName { get; set; }
        // Last name of the user
        public string LastName { get; set; }
        // Age of the user
        public int Age { get; set; }
    }
}