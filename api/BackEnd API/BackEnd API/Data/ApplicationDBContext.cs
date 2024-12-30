using BackEnd_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_API.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {

        }

        public DbSet<Stock> stocks { get; set; }
        public DbSet< Comment> comments{ get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }    
        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);
            builder.Entity<Portfolio>(x => x.HasKey(x => new {x.AppUserId,x.StockId }));
            builder.Entity<Portfolio>().HasOne(x=>x.AppUsers).WithMany(x=>x.Portfolios).HasForeignKey(x=>x.AppUserId);
            builder.Entity<Portfolio>().HasOne(x => x.Stock).WithMany(x => x.Portfolios).HasForeignKey(x => x.StockId);
            List<IdentityRole> roles = new List<IdentityRole>
            {
               new IdentityRole
               {
                   Name="Admin",
                   NormalizedName="ADMIN",
                    ConcurrencyStamp = Guid.NewGuid().ToString()
               },
               new IdentityRole
               {
                   Name="User",
                   NormalizedName="USER",
                     ConcurrencyStamp = Guid.NewGuid().ToString()
               },

            };
                builder.Entity<IdentityRole>().HasData(roles);  
        }
    }
    
    }
