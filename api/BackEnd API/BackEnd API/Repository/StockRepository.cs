using BackEnd_API.Data;
using BackEnd_API.DTO_s.Stock;
using BackEnd_API.Helper;
using BackEnd_API.Interfaces;
using BackEnd_API.Models;
using Microsoft.EntityFrameworkCore;
using QueryString = BackEnd_API.Helper.QueryString;

namespace BackEnd_API.Repository
{
    public class StockRepository : IStockRepository
    {
        private ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        { 

            _context= context;
        }

        public async Task<Stock> CreateStockAsync(Stock crt)
        {
            await _context.stocks.AddAsync(crt);
            await _context.SaveChangesAsync();
            return crt;
             
        }


        public async Task<Stock?> DeleteStockAsync(int id)
        {
            var stock = _context.stocks.FirstOrDefault(s => s.Id == id);
            if(stock == null)
            {
                return null;
            }
            _context.stocks.Remove(stock);
            await _context.SaveChangesAsync();
            return stock;

        }

        public async Task<List<Stock>> GetAllAsync(QueryString queryString)
        {
            var stock=  _context.stocks.Include(c=>c.comments).ThenInclude(ct=>ct.User).AsQueryable();
            if (!String.IsNullOrEmpty(queryString.stockName))
            {
               stock= stock.Where(s => s.CompanyName.Contains(queryString.stockName));
            }
            if (!String.IsNullOrEmpty(queryString.symbol))
            {
                stock = stock.Where(s => s.Symbol.Contains(queryString.symbol));
            }
            if (!String.IsNullOrEmpty(queryString.SortBy))
            {
                if (queryString.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                        stock=queryString.isDescending?stock.OrderByDescending(s=>s.Symbol):stock.OrderBy(s=>s.Symbol); 
                }
            }
            return await stock.ToListAsync();
        }
        
        public async Task<Stock?> GetByIDAsync(int id)
        {
            var stock = await _context.stocks.Include(c=>c.comments).FirstOrDefaultAsync(s=>s.Id==id);
            return stock;

        }

        public async Task<Stock?> GetStockBySymbol(string symbol)
        {
            return await _context.stocks.FirstOrDefaultAsync(x => x.Symbol.ToLower() == symbol.ToLower());
        }

        public async Task<bool> stockExist(int id)
        {
            return await _context.stocks.AnyAsync(s => s.Id == id);
        }

        public async Task<bool> stockExistBySymbol(string sybmol)
        {
           return await _context.stocks.AnyAsync(s=>s.Symbol==sybmol);  
        }

        public async Task<Stock?> UpdateStockAsync(int id, StockUpdateDto stock)
        {
            var st = _context.stocks.FirstOrDefault(s => s.Id == id);
            if (st==null)
            {
                return null;
            }
            
            st.LastDiv = stock.LastDiv;
            st.MarketCap = stock.MarketCap;
            st.Purchase = stock.Purchase;
            st.CompanyName = stock.CompanyName;
            st.Industry = stock.Industry;
            st.Symbol=stock.Symbol;
            await _context.SaveChangesAsync();
            return st;
        }
    }
}
