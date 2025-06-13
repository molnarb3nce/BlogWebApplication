namespace BlogApp.API.Models
{
    // Data Transfer Object for creating a new blog post
    // It separates the properties that the user should provide from those that are managed by the system
    public class CreateBlogPostDto
    {
        // The title of the blog post
        public required string Title { get; set; }
        // Content of the blog post
        public required string Content { get; set; }
        // Author of the blog post as default it becomes anonymous author
        public string? Author { get; set; }
    }
}