using Core.Identity;
using Microsoft.EntityFrameworkCore;

namespace Core.Interfaces
{
    public interface IIdentityRepository
    {
        DbSet<ApplicationUser> Users { get; set; }
    }
}
