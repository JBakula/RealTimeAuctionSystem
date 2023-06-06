using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Repositories.CategoryRepo;

namespace RealTimeAuctionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepo _categoryRepo;
        public CategoryController(ICategoryRepo categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await _categoryRepo.GetCategories());
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetAuctionsByCategoryId([FromRoute] int id)
        {
            var auctions = await _categoryRepo.GetAuctionByCategoryId(id);
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
        public async Task<IActionResult> AddCategory(CategoryRequestDto category)
        {
            return Ok(await _categoryRepo.AddCategory(category));
        }
    }
}
