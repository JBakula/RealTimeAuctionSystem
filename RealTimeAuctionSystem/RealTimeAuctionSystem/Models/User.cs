namespace RealTimeAuctionSystem.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public int RoleId { get;set; }
        public byte[] Password { get; set; }
        public byte[] PasswordSalt { get; set; }
        public List<Bid> Bids { get; set; } 
    }
}
