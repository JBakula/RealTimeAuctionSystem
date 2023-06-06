using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;

namespace RealTimeAuctionSystem.Repositories.CategoryRepo
{
    public interface ICategoryRepo
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<IEnumerable<Auction>> GetAuctionByCategoryId(int categoryId);
        Task<Category> AddCategory(CategoryRequestDto category);
    }
}
