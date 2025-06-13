namespace BlogApp.API.Models
{
    // Data Transfer Object for updating an existing blog post
    public class UpdateBlogPostDto
    {
        // Title of the blog post
        public string? Title { get; set; }
        // Content of the blog post
        public string? Content { get; set; }
        // Author of the blog post
        public string? Author { get; set; }
    }
}