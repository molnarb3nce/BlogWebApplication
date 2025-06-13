namespace BlogApp.API.Models
{
    // Data Transfer Object for deleting a user account
    public class DeleteUserDto
    {
        // Username of the account to be deleted
        public required string Username { get; set; }

        // Password of the account to be deleted
        public required string Password { get; set; }
    }
}