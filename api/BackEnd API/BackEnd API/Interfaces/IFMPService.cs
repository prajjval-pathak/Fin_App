using BackEnd_API.Models;

namespace BackEnd_API.Interfaces
{
    public interface IFMPService
    {
        Task<Stock?> GetStockBySymbolAsync(string symbol);
    }
}
