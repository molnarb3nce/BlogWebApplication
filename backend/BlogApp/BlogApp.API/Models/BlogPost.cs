namespace BlogApp.API.Models
{
    // Represents a blog post in the application and an entity in the database
    public class BlogPost
    {
        // Unique identifier for the blog post
        public int Id { get; set; }
        // Title of the blog post
        public required string Title { get; set; }
        // Content of the blog post
        public required string Content { get; set; }
        // Author of the blog post
        public required string Author { get; set; }
        // Date and time when the blog post was created
        public DateTime DateCreated { get; set; }
    }
}
