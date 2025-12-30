using BackEnd_API.Models;

namespace BackEnd_API.Interfaces
{
    public interface IFMPService
    {
        Task<Stock?> GetStockBySymbolAsync(string symbol);
        Task<string> SearchCompaniesAsync(string query);
        Task<string> GetCompanyProfileAsync(string symbol);
        Task<string> GetKeyMetricsAsync(string symbol);
        Task<string> GetIncomeStatementAsync(string symbol);
        Task<string> GetBalanceSheetAsync(string symbol);
        Task<string> GetCashFlowStatementAsync(string symbol);
    }
}
