namespace RealTimeAuctionSystem.Models
{
    public class Auction
    {
        public int AuctionId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public float StartingPrice { get; set; }
        public int CategoryId { get; set; }  
        public DateTime StartsAt { get; set; }
        public DateTime EndsIn { get; set;}
        public string? Image { get; set; }
        public List<Bid> Bids { get; set; }

    }
}
