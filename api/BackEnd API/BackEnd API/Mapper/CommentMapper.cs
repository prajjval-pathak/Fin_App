using BackEnd_API.DTO_s.Comment;
using BackEnd_API.Models;

namespace BackEnd_API.Mapper
{
    
    public static class CommentMapper
    {
           public static CommentDto toCommentDto(this Comment co)
        {
            return new CommentDto{
                Id = co.Id, 
                Content = co.Content,   
                CreatedOn = co.CreatedOn,
                StockId = co.StockId,
                UserName=co.User.UserName,
                Title=co.Title
            };
        }
        public static Comment CommentModelFromCreateDto(this CreateCommentDto ct,int stockId)
        {
            return new Comment
            {
                Content = ct.Content,  
                Title= ct.Title,    
                StockId = stockId,  
            };
        }
    }
}
