using Dapper;
using RealTimeAuctionSystem.Context;
using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;

namespace RealTimeAuctionSystem.Repositories.BidRepo
{
    public class BidRepo:IBidRepo
    {
        private readonly DapperContext _context;
        public BidRepo(DapperContext context) 
        {
            _context = context;
        }

        public async Task<Bid> CreateBid(CreateBidDto newBid)
        {
            var query = "insert into \"Bid\" (\"Value\",\"AuctionId\",\"UserId\") values (@Value,@AuctionId,@UserId) returning \"BidId\"";
            var parameters = new DynamicParameters();
            parameters.Add("Value", newBid.Value);
            parameters.Add("AuctionId", newBid.AuctionId);
            parameters.Add("UserId",newBid.UserId);
            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                var bid = new Bid
                {
                    BidId = id,
                    Value = newBid.Value,
                    AuctionId = newBid.AuctionId,
                    UserId = newBid.UserId
                };
                return bid;
            }
        }
    }
}
