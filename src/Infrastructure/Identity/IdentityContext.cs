using Core.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    public class IdentityContext : IdentityDbContext<ApplicationUser>, IIdentityRepository
    {
        public IdentityContext(DbContextOptions<IdentityContext> options)
           : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
