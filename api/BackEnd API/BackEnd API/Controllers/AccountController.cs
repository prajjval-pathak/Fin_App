using BackEnd_API.DTO_s.Account;
using BackEnd_API.Extensions;
using BackEnd_API.Interfaces;
using BackEnd_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Cryptography.Xml;

namespace BackEnd_API.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController:ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly ITokenServices _tokenServices;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> _usermanager, ITokenServices tokenServices,SignInManager<AppUser> signInManager)
        {
            userManager = _usermanager;
            _tokenServices = tokenServices;
            _signInManager = signInManager;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDto reg)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                var user = new AppUser
                {
                    UserName = reg.Username,
                    Email = reg.Email,
                };
                //var alreadyExist=await userManager.FindByEmailAsync(reg.Email);
                var regUser = await userManager.CreateAsync(user, reg.Password);
                if (regUser.Succeeded)
                {
                    var roleResult = await userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(new newUserDto
                        {
                            Email=user.Email,
                            UserName=user.UserName,
                            Token=_tokenServices.GenerateToken(user)
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, regUser.Errors);
                }

            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);  
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto ust)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var user = await userManager.Users.FirstOrDefaultAsync(x => x.UserName == ust.UserName);
                if (user == null)
                {
                    return Unauthorized("Invaid Username");
                }
                var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, ust.Password, false);
                if (passwordCheck.Succeeded)
                {
                    return Ok(
                    new newUserDto
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        Token = _tokenServices.GenerateToken(user)
                    });

                }
                else {
                    return Unauthorized("password Incorrect");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);   
            }
        }
        [HttpGet("isAuthenticated")]
        [Authorize]
        public IActionResult isUserAuthenticated()
        {
            var username = User.GetUserEmail();
            if (String.IsNullOrEmpty(username))
            {
                return Unauthorized(new { Message="User is Not Authenticated" });
            }
            else
            {
                return Ok(username);
            }
            
        }
    }
}
