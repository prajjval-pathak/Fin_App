using BackEnd_API.Interfaces;
using BackEnd_API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd_API.Services
{

    /// <summary>
    /// This class will be used to generate JWT ToKen for authentication 
    /// To generate JWT token we need Symmetric security key make sure Token  is not tempered with
    /// Claims like roles describing what user does or can't do but unlike roles they doeesn't requirre DB they are like key value pair within JWT 

    /// </summary>
    public class TokenService:ITokenServices
    {
        private readonly IConfiguration _configuration;
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SigningKey"]));
        }

        public string GenerateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email,user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName,user.UserName),


             };
            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
            var tokenDisc = new SecurityTokenDescriptor
            {
                Subject=new ClaimsIdentity(claims), 
                SigningCredentials = cred,
                Expires = DateTime.Now.AddDays(7),
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token=tokenHandler.CreateToken(tokenDisc);
            return tokenHandler.WriteToken(token);  
        }
    }
}
