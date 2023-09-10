using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealTimeAuctionSystem.DTOs;
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
        [HttpGet]
        public async Task<IActionResult> GetAuctions()
        {
            var auctions = await _auctionRepo.GetAuctions();
            if(auctions == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(auctions);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateAuction(CreateAuctionDto auction)
        {
            if (auction.Title == "" || auction.Description == "" || auction.StartingPrice < 0 || !await _auctionRepo.DoesCategoryExist(auction.CategoryId) )
            {
                return BadRequest();
            }
            else
            {
                var newAuction = await _auctionRepo.AddAuction(auction);
                if (newAuction == null)
                {
                    return StatusCode(500);
                }
                else
                {
                    return Ok(auction);

                }
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateAuction([FromRoute] int id, [FromForm]  UpdateAuctionDto auction)
        {
            if (!await _auctionRepo.DoesCategoryExist(id) || auction.Title == "" || auction.Description == "" || auction.StartingPrice < 0 ||
                !await _auctionRepo.DoesCategoryExist(auction.CategoryId) || DateTime.Parse(auction.EndsIn) < DateTime.Now)
            {
                return BadRequest();
            }
            else
            {
                await _auctionRepo.UpdateAuction(id, auction);    
                return Ok(new
                {
                    message = "successfully updated"
                }) ;
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteAuction([FromRoute] int id)
        {
            if(!await _auctionRepo.DoesAuctionExist(id))
            {
                return BadRequest();
            }
            else
            {
                await _auctionRepo.DeleteAuction(id);
                return Ok(new
                {
                    message = "successfully deleted"
                });
            }
            
        }
        [HttpGet]
        [Route("details/{id:int}")]
        public async Task<IActionResult> GetDetails([FromRoute]int id)
        {
            if (await _auctionRepo.DoesAuctionExist(id))
            {
                return Ok(await _auctionRepo.GetDetails(id));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
