using BackEnd_API.Data;
using BackEnd_API.Interfaces;
using BackEnd_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_API.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> CreatePortfolio(Portfolio pt)
        {
            await _context.AddAsync(pt);
            await _context.SaveChangesAsync();
            return pt;  
        }

        public async Task<Portfolio?> DeletePortfolio(AppUser user, string symbol)
        {
           var port = await _context.Portfolios.FirstOrDefaultAsync(s => s.AppUserId == user.Id && s.Stock.Symbol==symbol);
            if(port==null) return null;
            _context.Portfolios.Remove(port);
            await _context.SaveChangesAsync();
            return port;
        }

        public async Task<List<Stock>> GetUserStocks(AppUser user)
        {
            var stocks = await _context.Portfolios.Where(x => x.AppUserId == user.Id).Select(bt => new Stock
            {
                Purchase = bt.Stock.Purchase,
                MarketCap = bt.Stock.MarketCap,
                CompanyName = bt.Stock.CompanyName,
                Industry = bt.Stock.Industry,
                Symbol = bt.Stock.Symbol,

            }).ToListAsync();
            return stocks;  
        }
    }
}
