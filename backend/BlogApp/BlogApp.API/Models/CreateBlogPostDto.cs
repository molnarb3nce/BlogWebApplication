namespace BlogApp.API.Models
{
    // Data Transfer Object for creating a new blog post
    // It separates the properties that the user should provide from those that are managed by the system
    public class CreateBlogPostDto
    {
        // The title of the blog post
        public string Title { get; set; }
        // Content of the blog post
        public string Content { get; set; }
        // Author of the blog post
        public string Author { get; set; }
    }
}