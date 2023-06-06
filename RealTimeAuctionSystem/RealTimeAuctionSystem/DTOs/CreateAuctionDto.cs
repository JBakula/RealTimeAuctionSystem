﻿namespace RealTimeAuctionSystem.DTOs
{
    public class CreateAuctionDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public float StartingPrice { get; set; }
        public int CategoryId { get;set; }
        public DateTime EndsIn { get; set; }
        public IFormFile? Image { get; set; }
    }
}
