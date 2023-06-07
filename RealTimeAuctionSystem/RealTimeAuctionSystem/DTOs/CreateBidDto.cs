namespace RealTimeAuctionSystem.DTOs
{
    public class CreateBidDto
    {
        public float Value { get; set; }
        public int AuctionId { get; set; }
        public int UserId { get; set; }
    }
}
