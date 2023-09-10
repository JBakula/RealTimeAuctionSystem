using RealTimeAuctionSystem.Repositories.AuctionRepo;

namespace RealTimeAuctionSystem.Workers
{
    public class CloseAuction : BackgroundService
    {
        private readonly IAuctionRepo _auctionRepo;

        public CloseAuction(IAuctionRepo auctionRepo) 
        {
            _auctionRepo = auctionRepo;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(10000);
                var auctions = await _auctionRepo.GetFinishedAuctions();

                foreach(var auction in auctions)
                {
                   await _auctionRepo.DeleteAuction(auction.AuctionId);
                }
            }
        }
    }
}
