using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Interfaces
{
    public interface IAppRepository
    {
        DbSet<Message> Messages { get; set; }

        DbSet<MessageRecipient> MessageRecipients { get; set; }
    }
}
