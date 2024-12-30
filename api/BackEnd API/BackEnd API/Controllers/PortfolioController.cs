using BackEnd_API.Extensions;
using BackEnd_API.Interfaces;
using BackEnd_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BackEnd_API.Controllers
{
    [ApiController]
    [Route("api/Portfolio")]
    public class PortfolioController:ControllerBase
    { 
        private readonly UserManager<AppUser> _userManager;
        private readonly  IPortfolioRepository _portfolioRepository;
        private readonly IStockRepository _stockRepository; 
        private readonly IFMPService _fmpService;  
        public PortfolioController(UserManager<AppUser> userManager,IPortfolioRepository portfolioRepository,IStockRepository stockRepository,IFMPService fmpService)
        {
            _userManager = userManager;
            _portfolioRepository = portfolioRepository;
            _stockRepository = stockRepository;
            _fmpService = fmpService;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetPortfolios()
        {
            var user = User.GetUserEmail();
            var appUser = await _userManager.FindByEmailAsync(user);
            var portfolioStocks=await _portfolioRepository.GetUserStocks(appUser);
            return Ok(portfolioStocks);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePortfolio(string symbl)
        {
            var user=User.GetUserEmail();
            var stock =await _stockRepository.GetStockBySymbol(symbl);
            var appUser=await _userManager.FindByEmailAsync(user);
            var alreadyExist = appUser.Portfolios.FirstOrDefault(s=> s.Stock.Symbol == symbl);
            if (alreadyExist != null)
            {
                return BadRequest("Stock Already Exist in Portfolio");
            }
            if (stock == null)
            {
                var fmpStock = await _fmpService.GetStockBySymbolAsync(symbl);
                if (fmpStock == null)
                {
                    return BadRequest("Stock Not Found");
                }

                else
                {
                    await _stockRepository.CreateStockAsync(fmpStock);
                }
            }
            
                var portCreate = await _portfolioRepository.CreatePortfolio(new Portfolio
                {
                    AppUserId = appUser.Id,
                    StockId = stock.Id,
                });
                if (portCreate == null)
                {
                    return StatusCode(500);
                }


            return StatusCode(201);

        }
        [HttpDelete]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            //Get User From Identity
            var userEmail=User.GetUserEmail();
            var user=await _userManager.FindByEmailAsync(userEmail);
            var portfolioStocks=await _portfolioRepository.GetUserStocks(user);
            //var stocks=await _stockRepository.GetStockBySymbol(symbol);
            var filteredStocks = portfolioStocks.Where(s => s.Symbol == symbol).ToList();
            if (filteredStocks.Count == 1)
            {
                var delteStock = await _portfolioRepository.DeletePortfolio(user, symbol);
                if(delteStock == null)
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest("Stock Not in your portfolio");
            }
            return Ok();
        }
    }
}
