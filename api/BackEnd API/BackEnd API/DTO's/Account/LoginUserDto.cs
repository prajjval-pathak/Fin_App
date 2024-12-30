using System.ComponentModel.DataAnnotations;

namespace BackEnd_API.DTO_s.Account
{
    public class LoginUserDto
    {
        [Required]
        public string UserName { get; set; }   = string.Empty;
        [Required]
        public string Password {get;set;}=string.Empty;
    }
}
