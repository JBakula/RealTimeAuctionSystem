using Dapper;
using Microsoft.Extensions.Configuration;
using RealTimeAuctionSystem.Context;
using RealTimeAuctionSystem.DTOs;
using RealTimeAuctionSystem.Models;
using System.Collections;
using System.Data;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace RealTimeAuctionSystem.Repositories.UserRepo
{
    public class UserRepo:IUserRepo
    {
        private readonly DapperContext _context;
        private readonly IConfiguration _configuration;
        public UserRepo(DapperContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task RegisterUser(UserRegistrationDto newUser)
        {

            var query = "insert into \"User\" (\"UserName\",\"Email\",\"RoleId\",\"Password\",\"PasswordSalt\") values(@UserName,@Email,@RoleId,@Password,@PasswordSalt)";

            HashPassword(newUser.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var parameters = new DynamicParameters();
            parameters.Add("UserName", newUser.UserName, DbType.String);
            parameters.Add("Email", newUser.Email, DbType.String);
            parameters.Add("RoleId", 1, DbType.Int32);
            parameters.Add("Password", passwordHash);
            parameters.Add("PasswordSalt", passwordSalt);


            using (var connection =_context.CreateConnection())
            {
                await connection.ExecuteAsync(query,parameters);
                
            }
        }
        public void HashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt) 
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }
        public async Task<bool> DoesEmailExist(string email)
        {
            var query = "select * from \"User\" where \"Email\" = @Email";

            using (var connection = _context.CreateConnection())
            {
                var user = await connection.QueryFirstOrDefaultAsync<User>(query, new { email });
                if(user == null) { 
                
                    return false;

                }
                else
                {
                    return true;
                }
            }
        }
        public async Task<string> Login(LoginDto loginData)
        {
            var query = "select * from \"User\" where \"Email\" = @Email";
            
            using(var connection = _context.CreateConnection())
            {
                var user = await connection.QueryFirstOrDefaultAsync<User>(query, new { loginData.Email });
                if (user == null)
                {
                    return "";
                }
                else
                {
                    bool passwordCorrect = VerifyPasswordHash(loginData.Password, user.Password,user.PasswordSalt);
                    if (passwordCorrect)
                    {
                        var token = await CreateToken(user);
                        return token;
                    }
                    else
                    {
                        return "";
                    }
                    
                }
                
            }
        }
        private async Task<string> CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("userId",user.UserId.ToString()),
                new Claim("email",user.Email),
                new Claim("username",user.UserName),
                new Claim("roleId",user.RoleId.ToString())
            };
            var key =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:SecretKey").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using( var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);    
            }
        }
    }
}
