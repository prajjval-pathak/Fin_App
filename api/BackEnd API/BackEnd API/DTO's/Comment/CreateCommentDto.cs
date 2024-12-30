using System.ComponentModel.DataAnnotations;

namespace BackEnd_API.DTO_s.Comment
{
    public class CreateCommentDto
    {
        [Required]
        [MinLength(5,ErrorMessage ="Tile should be of minimum 5 characters")]
        [MaxLength(30,ErrorMessage ="Title cannot be more that 30 characters")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(5, ErrorMessage = "Content should be of minimum 5 characters")]
        [MaxLength(100, ErrorMessage = "Maximum 100 characters allowed")]
        public string Content { get; set; } = string.Empty;
    }
}
