﻿namespace RealTimeAuctionSystem.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;
        public List<User> Users { get; set; }   
    }
}
