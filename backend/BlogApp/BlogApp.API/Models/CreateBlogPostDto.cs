//This is a DTO for the blog posts to exclude the Id and DateCreated properties from the request body to separate those that the user should provide

namespace BlogApp.API.Models
{
    public class CreateBlogPostDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
    }
}