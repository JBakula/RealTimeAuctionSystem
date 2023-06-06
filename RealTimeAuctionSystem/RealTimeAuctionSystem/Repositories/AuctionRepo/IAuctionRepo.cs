using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;

namespace RealTimeAuctionSystem.Repositories.AuctionRepo
{
    public interface IAuctionRepo
    {
        Task<IEnumerable<Auction>> GetAuctions();
        Task<Auction> AddAuction(CreateAuctionDto newAuction);
        Task <string> GenerateImagePath(IFormFile image)
    }
}
