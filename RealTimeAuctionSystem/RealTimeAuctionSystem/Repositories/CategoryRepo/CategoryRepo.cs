using Dapper;
using RealTimeAuctionSystem.Context;
using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;
using System.Data;

namespace RealTimeAuctionSystem.Repositories.CategoryRepo
{
    public class CategoryRepo:ICategoryRepo
    {
        private readonly DapperContext _context;

        public CategoryRepo(DapperContext context)
        {
            _context = context;
        } 

        public async Task<IEnumerable<Category>> GetCategories()
        {
            var query = "SELECT * FROM \"Category\" ORDER BY \"CategoryName\"";

            using (var connection = _context.CreateConnection())
            {
                var categories = await connection.QueryAsync<Category>(query);
                return categories.ToList();
            }
        }
        public async Task<IEnumerable<Auction>> GetAuctionByCategoryId(int categoryId)
        {
            var query = "SELECT * FROM \"Auction\" WHERE \"CategoryId\" = @categoryId ORDER BY \"StartsAt\" DESC";

            using(var connection = _context.CreateConnection())
            {
                var auctions = await connection.QueryAsync<Auction>(query,new { categoryId });
                return auctions.ToList();
            }
        }
        public async Task<Category> AddCategory(CategoryRequestDto category)
        {
            var query = "INSERT INTO \"Category\" (\"CategoryName\") VALUES (@CategoryName) returning \"CategoryId\"";

            var parameters = new DynamicParameters();
            parameters.Add("CategoryName", category.CategoryName,DbType.String);

            using(var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                var newCategory = new Category
                {
                    CategoryId = id,
                    CategoryName = category.CategoryName
                };
                return newCategory;
            }
        }

    }
}
