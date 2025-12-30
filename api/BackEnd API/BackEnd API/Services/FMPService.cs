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
                Console.WriteLine(result);
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

        public async Task<string> SearchCompaniesAsync(string query)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/search-name?query={query}&apikey={_configuration["FMP_key"]}");
                if (result.IsSuccessStatusCode)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                return "[]";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in SearchCompaniesAsync: {ex}");
                return "[]";
            }
        }

        public async Task<string> GetCompanyProfileAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_configuration["FMP_key"]}");
                if (result.IsSuccessStatusCode)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                return "[]";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetCompanyProfileAsync: {ex}");
                return "[]";
            }
        }

        public async Task<string> GetKeyMetricsAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/key-metrics-ttm?symbol={symbol}&apikey={_configuration["FMP_key"]}");
                if (result.IsSuccessStatusCode)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                return "[]";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetKeyMetricsAsync: {ex}");
                return "[]";
            }
        }

        public async Task<string> GetIncomeStatementAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/income-statement?symbol={symbol}&apikey={_configuration["FMP_key"]}");
                if (result.IsSuccessStatusCode)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                return "[]";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetIncomeStatementAsync: {ex}");
                return "[]";
            }
        }

        public async Task<string> GetBalanceSheetAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/balance-sheet-statement?symbol={symbol}&apikey={_configuration["FMP_key"]}");
                if (result.IsSuccessStatusCode)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                return "[]";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetBalanceSheetAsync: {ex}");
                return "[]";
            }
        }

        public async Task<string> GetCashFlowStatementAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/cash-flow-statement?symbol={symbol}&apikey={_configuration["FMP_key"]}");
                if (result.IsSuccessStatusCode)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                return "[]";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetCashFlowStatementAsync: {ex}");
                return "[]";
            }
        }
    }
}
