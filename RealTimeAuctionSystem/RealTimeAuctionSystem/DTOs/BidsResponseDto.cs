namespace RealTimeAuctionSystem.DTOs
{
    public class BidsResponseDto
    {
        public int BidId { get;set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int AuctionId { get; set; }
        public float Value { get; set; }

    }
}
