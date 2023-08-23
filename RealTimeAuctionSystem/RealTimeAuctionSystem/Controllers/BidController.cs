using Microsoft.AspNetCore.Mvc;
using RealTimeAuctionSystem.Models;
using RealTimeAuctionSystem.Repositories.BidRepo;

namespace RealTimeAuctionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidRepo _bidRepo;

        public BidController(IBidRepo bidRepo)
        {
            _bidRepo = bidRepo;
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetBids([FromRoute] int id)
        {
            var bids = await _bidRepo.GetBids(id); 
            return Ok(bids);
        }

    }
}
