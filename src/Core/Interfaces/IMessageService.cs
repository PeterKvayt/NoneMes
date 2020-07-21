using Core.Identity;
using Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMessageService
    {
        List<ConversationViewModel> GetConversations(ApplicationUser currentUser);

        Task<List<ConversationViewModel>> GetConversationsAsync(ApplicationUser currentUser);
    }
}
