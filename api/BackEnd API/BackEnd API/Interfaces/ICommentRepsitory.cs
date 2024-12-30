using BackEnd_API.DTO_s.Comment;
using BackEnd_API.Models;

namespace BackEnd_API.Interfaces
{
    public interface ICommentRepsitory
    {
        Task<List<Comment>> GetAllAsync(CommentQueryObject cto);
        Task<Comment?> GetAsyncByID(int id);
        Task<Comment> CreateASync(int id,Comment comment);
        Task<Comment?> DeleteASync(int id);
        Task<Comment?> updateAsync(int id,UpdateCommentDto upd);

    }
}
