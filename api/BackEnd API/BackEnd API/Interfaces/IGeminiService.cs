using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd_API.Interfaces
{
    public interface IGeminiService
    {
        Task<string> AnalyzeStocksAsync(List<string> tickers);
    }
}
