namespace RealTimeAuctionSystem.Models
{
    public class Bid
    {
        public int BidId { get; set; }
        public float Value { get; set; }
        public int AuctionId { get; set; }
        public int UserId { get; set; }

    }
}
