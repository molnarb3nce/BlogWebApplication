using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.Models
   {
       public class UserLoginDto
       {
            [Required]
            public string UserName { get; set; }
            [Required]
            public string Password { get; set; }
       }
   }