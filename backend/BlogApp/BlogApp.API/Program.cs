using BlogApp.API.Data;
using BlogApp.API.Repositories;
using BlogApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BlogApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure MSSQL Database
            builder.Services.AddDbContext<BlogContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Configure Identity
            builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<BlogContext>()
                .AddDefaultTokenProviders();

            // Configure Authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                        System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });

            // Register repositories
            builder.Services.AddScoped<IBlogPostRepository, BlogPostRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication(); // Add authentication middleware
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
