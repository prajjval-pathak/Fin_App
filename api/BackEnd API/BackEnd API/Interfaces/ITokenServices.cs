using BackEnd_API.Models;

namespace BackEnd_API.Interfaces
{
    public interface ITokenServices
    {
        string GenerateToken(AppUser user);
    }
}
