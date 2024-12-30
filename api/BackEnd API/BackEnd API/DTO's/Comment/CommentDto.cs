using BackEnd_API.Models;

namespace BackEnd_API.DTO_s.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StockId { get; set; }
        public string UserName { get; set; } =string.Empty;
        
         
    }
}
