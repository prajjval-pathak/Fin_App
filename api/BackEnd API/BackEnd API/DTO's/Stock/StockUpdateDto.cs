using System.ComponentModel.DataAnnotations;

namespace BackEnd_API.DTO_s.Stock
{
    public class StockUpdateDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol Cannot be over 10 characters")]
        public string Symbol { get; set; } = String.Empty;
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol Cannot be over 10 characters")]
        public string CompanyName { get; set; } = String.Empty;
        [Required]
        [Range(1, 1000000000)]
        public decimal Purchase { get; set; }
        [Required]
        [Range(0.001, 100)]
        public decimal LastDiv { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Industry cannot be over 10 characters")]
        public string Industry { get; set; } = String.Empty;
        [Range(1, 5000000000)]
        public long MarketCap { get; set; }
    }
}
