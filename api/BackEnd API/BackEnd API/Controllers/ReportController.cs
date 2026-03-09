using BackEnd_API.DTO_s.Report;
using BackEnd_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace BackEnd_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IGeminiService _geminiService;

        public ReportController(IGeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> AnalyzeStocks([FromBody] GeminiAnalysisRequest request)
        {
            // Validate ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Additional validation for tickers
            if (request.Tickers == null || request.Tickers.Count == 0)
            {
                return BadRequest(new { message = "At least 1 ticker is required" });
            }

            if (request.Tickers.Count > 3)
            {
                return BadRequest(new { message = "Maximum 3 tickers allowed" });
            }

            // Allow common exchange symbol formats such as BRK.B and APC.F while
            // still rejecting whitespace and prompt-like arbitrary text.
            var tickerRegex = new Regex("^[A-Z0-9.-]{1,10}$", RegexOptions.IgnoreCase);
            foreach (var ticker in request.Tickers)
            {
                if (string.IsNullOrWhiteSpace(ticker))
                {
                    return BadRequest(new { message = "Ticker cannot be empty" });
                }

                if (!tickerRegex.IsMatch(ticker))
                {
                    return BadRequest(new { message = $"Invalid ticker format: {ticker}. Tickers must be 1-10 characters and may include letters, numbers, dots, or hyphens." });
                }
            }

            try
            {
                var analysis = await _geminiService.AnalyzeStocksAsync(request.Tickers);

                var response = new GeminiAnalysisResponse
                {
                    Analysis = analysis,
                    CreatedAt = DateTime.UtcNow
                };

                return Ok(response);
            }
            catch (InvalidOperationException ex) when (ex.Message.Contains("Rate limit exceeded"))
            {
                    return StatusCode(429, new { message = "API rate limit exceeded. Please try again after 5 minutes." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in ReportController: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while analyzing stocks." });
            }
        }
    }
}
