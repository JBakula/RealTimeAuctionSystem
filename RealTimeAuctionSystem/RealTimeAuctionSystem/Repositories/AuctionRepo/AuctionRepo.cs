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
        public async Task<Auction> CreateAuction(CreateAuctionDto newAuction)
        {
            var query = "insert into \"Auction\" (\"Title\",\"Description\",\"StartingPrice\",\"CategoryId\",\"StartsAt\",\"EndsIn\",\"Image\")" +
                " values (@Title,@Description,@StartingPrice,@CategoryId,@StartsAt,@EndsIn,@Image) returning \"AuctionId\"";

            var currentTime = DateTime.Now;
            var imagePath =await GenerateImagePath(newAuction.Image);
            var parameters = new DynamicParameters();
            parameters.Add("Title",newAuction.Title);
            parameters.Add("Description", newAuction.Description);
            parameters.Add("StartingPrice", newAuction.StartingPrice);
            parameters.Add("CategoryId", newAuction.CategoryId);
            parameters.Add("StartsAt", currentTime);
            parameters.Add("EndsIn", newAuction.EndsIn);
            parameters.Add("Image", imagePath);


            using (var connection = _context.CreateConnection())
            {
                var id =await connection.QuerySingleAsync<int>(query,parameters);

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
        public async Task<string> GenerateImagePath(IFormFile image)
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
    }
}
