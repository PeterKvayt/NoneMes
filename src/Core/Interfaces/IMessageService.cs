using Core.Identity;
using Core.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMessageService
    {
        List<ConversationViewModel> GetConversations(ApplicationUser currentUser);

        Task<List<ConversationViewModel>> GetConversationsAsync(ApplicationUser currentUser);

        Task<IEnumerable<MessageViewModel>> GetConversationMessagesAsync(string currentUserId, string participantId);

        IEnumerable<MessageViewModel> GetConversationMessages(string currentUserId, string participantId);

        Task AddMessageAsync(SendMessageViewModel message, ApplicationUser currentUser);

        void AddMessage(SendMessageViewModel message, ApplicationUser currentUser);

        Task<string> GetUserIdFromLoginAsync(string userLogin);

        string GetUserIdFromLogin(string userLogin);
    }
}
