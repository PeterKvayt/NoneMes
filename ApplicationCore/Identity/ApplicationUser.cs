using Microsoft.AspNetCore.Identity;
using System;

namespace ApplicationCore.Identity
{
    class ApplicationUser : IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Patronomic { get; set; }
        public string Address { get; set; }
        public DateTime DayOfBith { get; set; }
    }
}
