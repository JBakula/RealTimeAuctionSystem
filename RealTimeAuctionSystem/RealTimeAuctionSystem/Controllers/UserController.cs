using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Repositories.UserRepo;

namespace RealTimeAuctionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        public UserController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser(UserRegistrationDto userRegistrationDto)
        {
            if(userRegistrationDto.UserName =="" || userRegistrationDto.Email=="" || userRegistrationDto.Password.Length < 6 || await _userRepo.DoesEmailExist(userRegistrationDto.Email))
            {
                return BadRequest();
            }
            else
            {
                await _userRepo.RegisterUser(userRegistrationDto);
                return Ok(new
                {
                    message = "Registration successfull"
                }) ;
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto loginData)
        {
            if(loginData.Email=="" || loginData.Password.Length<6) {
                return BadRequest();
            }
            var token = await _userRepo.Login(loginData);
            if(token == "")
            {
                return BadRequest();
            }
            else
            {
                return Ok(new { Token=token });
            }
        }
    }
}
