namespace BackEnd_API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Title{ get; set; }=String.Empty;
        public string Content{ get; set; }=String.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StockId { get; set; }
        public Stock? Stock { get; set; } 
        public string AppUserId { get; set; }
        public AppUser User { get; set; }

    }
}
