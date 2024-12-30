namespace BackEnd_API.Helper
{
    public class QueryString
    {
        public string? symbol { get; set; } = null;
        public string? stockName { get; set; } = null;
        public string? SortBy { get; set; } = null; 
        public bool isDescending { get; set; } = false; 


    }
}
