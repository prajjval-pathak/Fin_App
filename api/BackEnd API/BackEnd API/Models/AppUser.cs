using Microsoft.AspNetCore.Identity;

namespace BackEnd_API.Models
{
    public class AppUser : IdentityUser
    {
        public List<Portfolio> Portfolios { get; set; } = new List<Portfolio> ();

    }
} 
    