using BackEnd_API.Interfaces;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd_API.Services
{
    public class GeminiService : IGeminiService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public GeminiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> AnalyzeStocksAsync(List<string> tickers)
        {
            try
            {
                var apiKey = _configuration["Gemini:ApiKey"];
                var model = _configuration["Gemini:Model"] ?? "gemini-1.5-flash";
                if (string.IsNullOrEmpty(apiKey))
                {
                    throw new InvalidOperationException("Gemini API key is not configured.");
                }

                var tickersString = string.Join(", ", tickers);
                var prompt = $@"Analyze these stock tickers: [{tickersString}].

Return plain text only.
Keep the answer concise, practical, and easy for a beginner to scan.

For each ticker, use exactly this structure:
Ticker: <ticker>
Sentiment: <Bullish / Neutral / Bearish>
Why: <1 short sentence>
Key Risk: <1 short sentence>
Beginner Note: <1 short sentence>

Rules:
- Do not use markdown, headings, bullet points, or disclaimers.
- Do not mention that you are an AI assistant.
- Keep each field short and specific.
- If you are uncertain, say so briefly instead of inventing details.";

                // Follow the documented REST request shape so model, prompt, and output controls
                // are explicit instead of relying on URL query parameters and implicit defaults.
                var requestBody = new
                {
                    system_instruction = new
                    {
                        parts = new[]
                        {
                            new
                            {
                                text = "You are a financial learning assistant. Be balanced, concise, and educational. Never give direct buy or sell advice. Follow the requested output format exactly."
                            }
                        }
                    },
                    contents = new[]
                    {
                        new
                        {
                            parts = new[]
                            {
                                new { text = prompt }
                            }
                        }
                    },
                    generationConfig = new
                    {
                        temperature = 0.4,
                        responseMimeType = "text/plain"
                    }
                };

                var jsonContent = JsonConvert.SerializeObject(requestBody);
                using var request = new HttpRequestMessage(
                    HttpMethod.Post,
                    $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
                );
                request.Headers.Add("x-goog-api-key", apiKey);
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await _httpClient.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();

                    // Handle blocked/empty model responses without throwing null reference exceptions.
                    var jsonResponse = JsonConvert.DeserializeObject<JObject>(responseContent);
                    var text = jsonResponse?["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.ToString();

                    if (string.IsNullOrWhiteSpace(text))
                    {
                        throw new InvalidOperationException("Gemini API returned an empty analysis response.");
                    }

                    return text;
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
                {
                    throw new InvalidOperationException("Rate limit exceeded. Please try again later.");
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new InvalidOperationException(
                        $"Gemini API error: {(int)response.StatusCode} {response.StatusCode} - {errorContent}"
                    );
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GeminiService: {ex.Message}");
                throw;
            }
        }
    }
}
