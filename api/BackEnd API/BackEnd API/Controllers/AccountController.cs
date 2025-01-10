using BackEnd_API.DTO_s.Account;
using BackEnd_API.Extensions;
using BackEnd_API.Interfaces;
using BackEnd_API.Models;
using BackEnd_API.Services;
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
        private readonly IEmailService _emailService;   
        public AccountController(UserManager<AppUser> _usermanager, ITokenServices tokenServices,SignInManager<AppUser> signInManager,IEmailService emailSerivce)
        {
            userManager = _usermanager;
            _tokenServices = tokenServices;
            _signInManager = signInManager;
            _emailService = emailSerivce;
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
                    if (!roleResult.Succeeded)
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, token = token }, Request.Scheme);
                    await _emailService.SendEmailAsync(user.Email!, "Confirm your email", $"Please confirm your account by clicking <a href=\"{confirmationLink}\">here</a>.");
                    return Ok(new
                    {
                        Message = "Registration successful! Please check your email to confirm your account."
                    });
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

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
            {
                return BadRequest("Invalid email confirmation request.");
            }

            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email confirmed successfully!");
            }

            return BadRequest("Email confirmation failed.");
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
