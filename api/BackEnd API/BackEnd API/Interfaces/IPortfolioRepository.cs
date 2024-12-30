using BackEnd_API.Models;

namespace BackEnd_API.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserStocks(AppUser user);
        Task<Portfolio> CreatePortfolio(Portfolio pt);
        Task<Portfolio?> DeletePortfolio(AppUser user,string symbol);
    }
}
