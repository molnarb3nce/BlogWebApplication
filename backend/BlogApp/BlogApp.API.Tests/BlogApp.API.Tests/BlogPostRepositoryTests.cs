using BlogApp.API.Models;
using BlogApp.API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace BlogApp.Tests
{
    public class BlogPostRepositoryTests
    {
        // Tests if a new blog post is successfully added to the repository
        [Fact]
        public async Task Create_AddsNewBlogPost_ToRepository()
        {
            var repository = new InMemoryRepository();
            var post = new BlogPost
            {
                Id = 1,
                Title = "Test Post",
                Content = "Test Content",
                Author = "Test Author",
                AuthorId = "Author123",
                DateCreated = DateTime.Now
            };

            await repository.AddAsync(post);

            var allPosts = await repository.GetAllAsync();
            Assert.Single(allPosts);
            Assert.Equal("Test Post", allPosts.First().Title);
        }

        // Tests if GetByIdAsync returns the correct blog post when it exists in the repository
        [Fact]
        public async Task GetById_ReturnsCorrectBlogPost_WhenExists()
        {
            var repository = new InMemoryRepository();
            var post = new BlogPost
            {
                Id = 1,
                Title = "Test Post",
                Content = "Test Content",
                Author = "Test Author",
                AuthorId = "Author123",
                DateCreated = DateTime.Now
            };
            await repository.AddAsync(post);

            var result = await repository.GetByIdAsync(1);

            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("Test Post", result.Title);
            Assert.Equal("Test Content", result.Content);
        }

        // Tests if GetByIdAsync returns null when the post does not exist
        [Fact]
        public async Task GetById_ReturnsNull_WhenPostDoesNotExist()
        {
            var repository = new InMemoryRepository();

            var result = await repository.GetByIdAsync(999);

            Assert.Null(result);
        }

        // Tests if GetAllAsync returns all blog posts in the repository
        [Fact]
        public async Task GetAll_ReturnsAllBlogPosts()
        {
            var repository = new InMemoryRepository();
            var posts = new List<BlogPost>
            {
                new BlogPost { Id = 1, Title = "Post 1", Content = "Content 1", Author = "Author 1", AuthorId = "AuthorId1", DateCreated = DateTime.Now },
                new BlogPost { Id = 2, Title = "Post 2", Content = "Content 2", Author = "Author 2", AuthorId = "AuthorId2", DateCreated = DateTime.Now },
                new BlogPost { Id = 3, Title = "Post 3", Content = "Content 3", Author = "Author 3", AuthorId = "AuthorId3", DateCreated = DateTime.Now }
            };

            foreach (var post in posts)
            {
                await repository.AddAsync(post);
            }

            var result = await repository.GetAllAsync();

            Assert.Equal(3, result.Count());
            Assert.Contains(result, p => p.Id == 1);
            Assert.Contains(result, p => p.Id == 2);
            Assert.Contains(result, p => p.Id == 3);
        }

        // Tests if GetAllAsync returns an empty collection when the repository is empty
        [Fact]
        public async Task GetAll_ReturnsEmptyCollection_WhenRepositoryIsEmpty()
        {
            var repository = new InMemoryRepository();

            var result = await repository.GetAllAsync();

            Assert.Empty(result);
        }

        // Tests if UpdateAsync correctly modifies an existing blog post
        [Fact]
        public async Task Update_ModifiesBlogPost_WhenExists()
        {
            var repository = new InMemoryRepository();
            var post = new BlogPost
            {
                Id = 1,
                Title = "Original Title",
                Content = "Original Content",
                Author = "Original Author",
                AuthorId = "Original Author123",
                DateCreated = DateTime.Now
            };
            await repository.AddAsync(post);

            var updatedPost = new BlogPost
            {
                Id = 1,
                Title = "Updated Title",
                Content = "Updated Content",
                Author = "Updated Author",
                AuthorId = "Updated Author123",
                DateCreated = DateTime.Now.AddHours(1)
            };

            await repository.UpdateAsync(updatedPost);

            var result = await repository.GetByIdAsync(1);
            Assert.Equal("Updated Title", result.Title);
            Assert.Equal("Updated Content", result.Content);
        }

        // Tests if DeleteAsync removes the post from the repository when it exists
        [Fact]
        public async Task Delete_RemovesPost_WhenExists()
        {
            var repository = new InMemoryRepository();
            var post = new BlogPost
            {
                Id = 1,
                Title = "Test Post",
                Content = "Test Content",
                Author = "Test Author",
                AuthorId = "Author123",
                DateCreated = DateTime.Now
            };
            await repository.AddAsync(post);

            await repository.DeleteAsync(1);

            var result = await repository.GetAllAsync();
            Assert.Empty(result);
        }

        // Tests if DeleteAsync does nothing when the post does not exist
        [Fact]
        public async Task Delete_DoesNothing_WhenPostDoesNotExist()
        {
            var repository = new InMemoryRepository();
            var post = new BlogPost
            {
                Id = 1,
                Title = "Test Post",
                Content = "Test Content",
                Author = "Test Author",
                AuthorId = "Author123",
                DateCreated = DateTime.Now
            };
            await repository.AddAsync(post);

            await repository.DeleteAsync(999);

            var result = await repository.GetAllAsync();
            Assert.Single(result);
        }
    }
}