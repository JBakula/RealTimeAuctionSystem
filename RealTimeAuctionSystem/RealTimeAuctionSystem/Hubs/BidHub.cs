using Microsoft.AspNetCore.SignalR;
using RealTimeAuctionSystem.Context;
using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Repositories.BidRepo;

namespace RealTimeAuctionSystem.Hubs
{
    public class BidHub:Hub
    {
        private readonly IBidRepo _bidRepo;
        public BidHub(IBidRepo bidRepo) 
        {
            _bidRepo = bidRepo;
        }

        public async Task CreateBid(int userId, int auctionId, float value)
        {
            var newBidDto = new CreateBidDto
            {
                AuctionId = auctionId,
                Value = value,
                UserId = userId
            };
            var bid = await _bidRepo.CreateBid(newBidDto);
            await Clients.All.SendAsync("newBid", bid);
        }
    }
}
