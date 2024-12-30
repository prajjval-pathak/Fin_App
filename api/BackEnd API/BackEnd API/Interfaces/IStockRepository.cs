using BackEnd_API.DTO_s.Stock;
using BackEnd_API.Helper;
using BackEnd_API.Models;
using QueryString = BackEnd_API.Helper.QueryString;

namespace BackEnd_API.Interfaces
{
    public interface IStockRepository
    {
         Task<List<Stock>> GetAllAsync(QueryString querystring);
        Task<Stock?> GetByIDAsync(int id);
        Task<Stock> CreateStockAsync(Stock crt);
        Task<Stock?> UpdateStockAsync(int id,StockUpdateDto stock);
        Task<Stock?> DeleteStockAsync(int id);
        Task<bool> stockExist(int id);
        Task<bool> stockExistBySymbol(string sybmol);
        Task<Stock?> GetStockBySymbol(string symbol);    

    }
}
