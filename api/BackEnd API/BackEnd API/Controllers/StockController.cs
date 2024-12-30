using BackEnd_API.Data;
using BackEnd_API.DTO_s.Stock;
using BackEnd_API.Helper;
using BackEnd_API.Interfaces;
using BackEnd_API.Mapper;
using BackEnd_API.Models;
using BackEnd_API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueryString = BackEnd_API.Helper.QueryString;

namespace BackEnd_API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {

        private IStockRepository _stockrepository;
        public StockController(IStockRepository stockRepository)
        {
            _stockrepository = stockRepository;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetStocks([FromQuery] QueryString queryString)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stocksdb =await _stockrepository.GetAllAsync(queryString);
            var stocks = stocksdb.Select(s => s.toStockDto()).ToList();
            if (stocks == null)
            {
                return NotFound();
            }
            return Ok(stocks);

        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStocksByID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stocks = await _stockrepository.GetByIDAsync(id);
         
            if (stocks == null)
            {
                return NotFound();
            }
            var stock = stocks.toStockDto();
            return Ok(stock);

        }
        [HttpPost]
        public async Task<IActionResult> CreateStock([FromBody] CreatStockRequestDto stockReq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stock = stockReq.ToStockFromCreate();
           await  _stockrepository.CreateStockAsync(stock); 
            return CreatedAtAction(nameof(GetStocksByID), new { id = stock.Id }, stock.toStockDto());
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateStock([FromRoute] int id, [FromBody] StockUpdateDto upd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stock = await _stockrepository.UpdateStockAsync(id, upd);
            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.toStockDto());
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStock([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stock = await _stockrepository.DeleteStockAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            return NoContent();
        }
        


    }
}
