using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;

namespace RealTimeAuctionSystem.Repositories.UserRepo
{
    public interface IUserRepo
    {
        Task RegisterUser(UserRegistrationDto newUser);
        void HashPassword(string password,out byte[] passwordHash,out byte[] passwordSalt);
        Task<bool> DoesEmailExist(string email);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        Task<string> Login(LoginDto loginData);
    }
}
