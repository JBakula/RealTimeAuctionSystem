using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;

namespace RealTimeAuctionSystem.Repositories.AuctionRepo
{
    public interface IAuctionRepo
    {
        Task<IEnumerable<Auction>> GetAuctions();
        Task<Auction> AddAuction(CreateAuctionDto newAuction);
        string GenerateImagePath(IFormFile image);
        Task<bool> DoesCategoryExist(int categoryId);
        Task UpdateAuction(int id, UpdateAuctionDto auction);
        Task DeleteAuction(int id);
        Task<bool> DoesAuctionExist(int id);
        Task<AuctionDetails> GetDetails(int id);
  
    }
}
