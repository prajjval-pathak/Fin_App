namespace BackEnd_API.Models
{ 
    public class Portfolio
    {
        public string AppUserId { get; set; }  
        public int StockId { get; set; }
        public AppUser AppUsers { get; set; }
        public Stock Stock { get; set; }

    }
}
