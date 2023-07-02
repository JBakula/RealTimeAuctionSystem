using Dapper;
using Microsoft.AspNetCore.Hosting;
using RealTimeAuctionSystem.Context;
using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;

namespace RealTimeAuctionSystem.Repositories.AuctionRepo
{
    public class AuctionRepo:IAuctionRepo
    {
        private readonly DapperContext _context;
        public static IWebHostEnvironment _webHostEnvironment;
        public AuctionRepo(DapperContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<IEnumerable<Auction>> GetAuctions()
        {
            var query = "select * from \"Auction\" order by \"StartsAt\" desc";

            using(var connection = _context.CreateConnection())
            {
                var auctions = await connection.QueryAsync<Auction>(query);
                return auctions.ToList();
            }
        }
        public async Task<Auction> AddAuction(CreateAuctionDto newAuction)
        {
            var query = "insert into \"Auction\" (\"Title\",\"Description\",\"StartingPrice\",\"CategoryId\",\"StartsAt\",\"EndsIn\",\"Image\")" +
                " values (@Title,@Description,@StartingPrice,@CategoryId,@StartsAt,@EndsIn,@Image) returning \"AuctionId\"";

            var currentTime = DateTime.Now;
            var imagePath = GenerateImagePath(newAuction.Image);
            DateTime endsIn = DateTime.Parse(newAuction.EndsIn);
            var parameters = new DynamicParameters();
            parameters.Add("Title",newAuction.Title);
            parameters.Add("Description", newAuction.Description);
            parameters.Add("StartingPrice", newAuction.StartingPrice);
            parameters.Add("CategoryId", newAuction.CategoryId);
            parameters.Add("StartsAt", currentTime);
            parameters.Add("EndsIn", endsIn);
            parameters.Add("Image", imagePath);


            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query,parameters);

                var auction = new Auction
                {
                    AuctionId = id,
                    Title = newAuction.Title,
                    Description = newAuction.Description,
                    StartingPrice = newAuction.StartingPrice,
                    CategoryId = newAuction.CategoryId,
                    StartsAt = currentTime,
                    EndsIn = newAuction.EndsIn,
                    Image = imagePath
                };
                return auction;
            }

        }
        public string GenerateImagePath(IFormFile image)
        {
            try
            {


                var imageName = (Guid.NewGuid().ToString().Replace("-", "")) + "_" + image.FileName;


                var path = Path.Combine(_webHostEnvironment.WebRootPath, "images", imageName);

                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }

                return "/images/" + imageName;
            }
            catch (Exception e)
            {
                return "";
            }
        }
        public async Task<bool> DoesCategoryExist(int categoryId)
        {
            var query = "select * from \"Category\" where \"CategoryId\"=@CategoryId";
            
            using (var connection = _context.CreateConnection())
            {
                var category = await connection.QueryFirstOrDefaultAsync(query, new { categoryId });
                if (category != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public async Task UpdateAuction(int id, UpdateAuctionDto auction)
        {
            var query = "update \"Auction\" set \"Title\" = @Title, \"Description\" = @Description, \"StartingPrice\" = @StartingPrice, \"CategoryId\" = @CategoryId," +
                "\"StartsAt\" = @StartsAt, \"EndsIn\" = @EndsIn, \"Image\" = @Image where \"AuctionId\" = @AuctionId ";

            var paramteres = new DynamicParameters();
            var imagePath = GenerateImagePath(auction.Image);
            paramteres.Add("AuctionId", id);
            paramteres.Add("Title", auction.Title);
            paramteres.Add("Description", auction.Description);
            paramteres.Add("StartingPrice", auction.StartingPrice);
            paramteres.Add("CategoryId", auction.CategoryId);
            paramteres.Add("StartsAt", auction.StartsAt);
            paramteres.Add("EndsIn", auction.EndsIn);
            paramteres.Add("Image", imagePath);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, paramteres);

            }
        }

        public async Task DeleteAuction(int id)
        {
            var query = "delete from \"Auction\" where \"AuctionId\" = @id";
            using(var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query,new { id });
            }

        }
        public async Task<bool> DoesAuctionExist(int id)
        {
            var query = "select * from \"Auction\" where \"AuctionId\" = @id";

            using(var connection = _context.CreateConnection())
            {
                var auction = await connection.QueryFirstOrDefaultAsync<Auction>(query,new { id });
                if(auction != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public async Task<AuctionDetails> GetDetails(int id)
        {
            var query = "SELECT a.\"AuctionId\", a.\"Title\", a.\"Description\", a.\"StartingPrice\", c.\"CategoryId\", a.\"StartsAt\", a.\"EndsIn\", a.\"Image\", c.\"CategoryName\" " +
            "FROM \"Auction\" a " +
            "JOIN \"Category\" c ON c.\"CategoryId\" = a.\"CategoryId\" " +
            "WHERE a.\"AuctionId\" = @id";

            using (var connection = _context.CreateConnection())
            {
                var details = await connection.QueryFirstOrDefaultAsync<AuctionDetails>(query, new { id });
                return details;
            }
        }
    }
}
