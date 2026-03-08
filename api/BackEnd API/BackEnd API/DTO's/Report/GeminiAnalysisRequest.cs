using System.ComponentModel.DataAnnotations;

namespace BackEnd_API.DTO_s.Report
{
    public class GeminiAnalysisRequest
    {
        [Required(ErrorMessage = "Tickers list is required")]
        [MinLength(1, ErrorMessage = "At least 1 ticker is required")]
        [MaxLength(3, ErrorMessage = "Maximum 3 tickers allowed")]
        public List<string>? Tickers { get; set; }
    }
}
