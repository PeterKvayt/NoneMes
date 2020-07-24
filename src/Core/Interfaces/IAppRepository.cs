using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Interfaces
{
    public interface IAppRepository
    {
        DbSet<Message> Messages { get; set; }

        DbSet<MessageRecipient> MessageRecipients { get; set; }

        int SaveChanges();
    }
}
