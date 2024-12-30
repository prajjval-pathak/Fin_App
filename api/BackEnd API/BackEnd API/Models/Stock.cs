﻿using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd_API.Models
{
    public class Stock
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = String.Empty;
        public string CompanyName { get; set; } = String.Empty ;
        [Column(TypeName ="decimal(18,2)")]
        public decimal Purchase { get; set; }
        [Column(TypeName ="decimal(18,2)")]
        public decimal LastDiv { get; set; }
        public string Industry { get; set; }=String.Empty;  
        public long MarketCap { get; set; } 
        public List<Comment> comments { get; set; } = new List<Comment>();
        public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();

    }
}
