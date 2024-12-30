using BackEnd_API.DTO_s.Comment;
using BackEnd_API.Extensions;
using BackEnd_API.Interfaces;
using BackEnd_API.Mapper;
using BackEnd_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CommentController:ControllerBase
    {
        private readonly ICommentRepsitory _commentrepository;
        private readonly IStockRepository _stockRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fampService;
        public CommentController(ICommentRepsitory commentrepostiory,IStockRepository stockrepository, UserManager<AppUser> usermanager, IFMPService fampService)
        {
            _commentrepository = commentrepostiory;
            _stockRepository = stockrepository;
            _userManager = usermanager;
            _fampService = fampService; 
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllComments([FromQuery] CommentQueryObject cto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentLi=await _commentrepository.GetAllAsync(cto);
            var comment = commentLi.Select(s => s.toCommentDto());
            return Ok(comment);
        }



        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCommentById([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comment=await _commentrepository.GetAsyncByID(id);
            if(comment==null)
            {
                return NotFound();
            }
            return Ok(comment.toCommentDto());
        }
        [Authorize]
        [HttpPost("{symbol:alpha}")]
        public async Task<IActionResult> CreateComment([FromRoute] string symbol, [FromBody] CreateCommentDto createComment) 
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = User.GetUserEmail();
            var appUser = await _userManager.FindByEmailAsync(user);
            var stock =await _stockRepository.GetStockBySymbol(symbol);
            if (stock==null)
            {
                stock=await _fampService.GetStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    return BadRequest("Stock Doesn't exist");
                }
                else
                {

                    await _stockRepository.CreateStockAsync(stock);
                }
                

            }
            Comment comment = createComment.CommentModelFromCreateDto(stock.Id);
            comment.AppUserId = appUser.Id;
            var createdComment=await _commentrepository.CreateASync(stock.Id,comment);
            return CreatedAtAction("GetCommentById", new { id = comment.Id },comment.toCommentDto());
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCo2wdmment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comment = await _commentrepository.DeleteASync(id);
            if (comment == null)
            {
                return NotFound("No comment found with given ID");
            }
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateComment([FromRoute]int id,[FromBody] UpdateCommentDto upd)
        {
            var update = await _commentrepository.updateAsync(id,upd);
            if(update == null)
            {
                return NotFound("No comment with given id found");
            }
            return Ok(update.toCommentDto());
        }
    }
}
