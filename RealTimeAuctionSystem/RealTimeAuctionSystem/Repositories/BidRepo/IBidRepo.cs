using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;

namespace RealTimeAuctionSystem.Repositories.BidRepo
{
    public interface IBidRepo
    {
        Task<Bid> CreateBid(CreateBidDto newBid);
        Task<IEnumerable<BidsResponseDto>> GetBids(int auctionId);
    }
}
