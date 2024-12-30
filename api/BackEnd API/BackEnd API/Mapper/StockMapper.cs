using BackEnd_API.DTO_s.Service;
using BackEnd_API.DTO_s.Stock;
using BackEnd_API.Models;

namespace BackEnd_API.Mapper
{
    public static class StockMapper
    {
        public static StockDto toStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                CompanyName = stockModel.CompanyName,
                Id = stockModel.Id,
                Industry = stockModel.Industry,
                LastDiv = stockModel.LastDiv,
                MarketCap = stockModel.MarketCap,
                Purchase = stockModel.Purchase,
                Symbol = stockModel.Symbol,
                comments = stockModel.comments.Select(c => c.toCommentDto()).ToList()
            };

        }
        public static Stock ToStockFromCreate(this CreatStockRequestDto ct)
        {
            return new Stock
            {
               CompanyName=ct.CompanyName,
               Industry=ct.Industry,    
               MarketCap=ct.MarketCap,  
               LastDiv = ct.LastDiv,
               Purchase = ct.Purchase,  
               Symbol=ct.Symbol 
            };
        }
        public static Stock toStockFromFMP(this FmpServiceObj fmp)
        {
            return new Stock
            {
                CompanyName =fmp.companyName,
                Industry = fmp.industry,
                MarketCap = fmp.mktCap,
                LastDiv = (decimal)fmp.lastDiv,
                Purchase = (decimal)fmp.price,
                Symbol = fmp.symbol
            };
        }
    }
}
