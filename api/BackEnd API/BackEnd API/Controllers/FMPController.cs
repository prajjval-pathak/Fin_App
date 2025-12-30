using BackEnd_API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FMPController : ControllerBase
    {
        private readonly IFMPService _fmpService;

        public FMPController(IFMPService fmpService)
        {
            _fmpService = fmpService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchCompanies([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Query parameter is required");
            }

            var result = await _fmpService.SearchCompaniesAsync(query);
            return Content(result, "application/json");
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetCompanyProfile([FromQuery] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol parameter is required");
            }

            var result = await _fmpService.GetCompanyProfileAsync(symbol);
            return Content(result, "application/json");
        }

        [HttpGet("key-metrics")]
        public async Task<IActionResult> GetKeyMetrics([FromQuery] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol parameter is required");
            }

            var result = await _fmpService.GetKeyMetricsAsync(symbol);
            return Content(result, "application/json");
        }

        [HttpGet("income-statement")]
        public async Task<IActionResult> GetIncomeStatement([FromQuery] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol parameter is required");
            }

            var result = await _fmpService.GetIncomeStatementAsync(symbol);
            return Content(result, "application/json");
        }

        [HttpGet("balance-sheet")]
        public async Task<IActionResult> GetBalanceSheet([FromQuery] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol parameter is required");
            }

            var result = await _fmpService.GetBalanceSheetAsync(symbol);
            return Content(result, "application/json");
        }

        [HttpGet("cash-flow")]
        public async Task<IActionResult> GetCashFlowStatement([FromQuery] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol parameter is required");
            }

            var result = await _fmpService.GetCashFlowStatementAsync(symbol);
            return Content(result, "application/json");
        }
    }
}
