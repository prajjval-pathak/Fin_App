using BackEnd_API.DTO_s.Service;
using BackEnd_API.Interfaces;
using BackEnd_API.Mapper;
using BackEnd_API.Models;
using Newtonsoft.Json;

namespace BackEnd_API.Services
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        public FMPService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public async Task<Stock?> GetStockBySymbolAsync(string symbol)
        {
            try
            {

                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_configuration["FMP_key"]}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var res = JsonConvert.DeserializeObject<FmpServiceObj[]>(content);
                    var stock = res[0];
                    if (stock != null)
                    {
                        return stock.toStockFromFMP();
                    }
                    Console.WriteLine(result);

                }

                return null;

            }
            catch (Exception ex)
            {

                Console.WriteLine($"Exception of type ${ex}");
                return null;
            }
        }
    }
}
