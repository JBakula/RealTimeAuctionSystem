using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealTimeAuctionSystem.Repositories.AuctionRepo;

namespace RealTimeAuctionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionRepo _auctionRepo;
        public AuctionController(IAuctionRepo auctionRepo)
        {
            _auctionRepo = auctionRepo;
        }
    }
}
