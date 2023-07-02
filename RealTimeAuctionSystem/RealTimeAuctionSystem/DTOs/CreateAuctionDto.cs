﻿namespace RealTimeAuctionSystem.DTOs
{
    public class CreateAuctionDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public float StartingPrice { get; set; }
        public int CategoryId { get;set; }
        public string EndsIn { get; set; } = string.Empty;
        public IFormFile? Image { get; set; }
    }
}
