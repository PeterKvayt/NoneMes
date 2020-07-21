using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
   public class ApplicationContext : DbContext, IAppRepository
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
           : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageRecipient> MessageRecipients { get; set; }
    }
}
