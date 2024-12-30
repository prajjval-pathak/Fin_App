using BackEnd_API.Data;
using BackEnd_API.DTO_s.Comment;
using BackEnd_API.Interfaces;
using BackEnd_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_API.Repository
{
    public class CommentRepository : ICommentRepsitory
    {
        private readonly ApplicationDBContext _context;

        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        
        public async Task<Comment> CreateASync(int id, Comment comment)
        {
           await _context.comments.AddAsync(comment);   
            await _context.SaveChangesAsync();
            return comment;
        }


        public async Task<Comment?> DeleteASync(int id)
        {
            var comment=await _context.comments.FirstOrDefaultAsync(ft=>ft.Id==id);
            if (comment == null)
            {
                return null;
            }
            _context.comments.Remove(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject cto)
        {
            var comments = _context.comments.Include(c => c.User).AsQueryable();
            //var comment = new List<Comment>();
            if (!String.IsNullOrEmpty(cto?.symbol))
            {
                comments = comments.Where(ct => ct.Stock.Symbol == cto.symbol);
            }
            if (cto?.isDescending == true)
            {
                 comments = comments.OrderByDescending(ct => ct.CreatedOn);
            }
            return await comments.ToListAsync();
            
        }

        public  async Task<Comment?> GetAsyncByID(int id)
        {
            var comment = await _context.comments.Include(c=>c.User).FirstOrDefaultAsync(ct=>ct.Id==id);
            if(comment == null) return null;    
            return comment;
        }

        public async Task<Comment?> updateAsync(int id,UpdateCommentDto upd)
        {
            var comment = await _context.comments.FindAsync(id);
            if (comment == null)
            {
                return null;
            }
            comment.Title = upd.title;
            comment.Content = upd.content;
            await _context.SaveChangesAsync();
            return comment;

        }

    }
}
