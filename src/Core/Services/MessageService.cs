using Core.Identity;
using Core.Interfaces;
using Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Services
{
    class MessageService : IMessageService
    {
        private IAppRepository _appRepository;
        private IIdentityRepository _identityRepository;

        public MessageService(IAppRepository appRepository, IIdentityRepository identityRepository)
        {
            _appRepository = appRepository;
            _identityRepository = identityRepository;
        }

        public List<ConversationViewModel> GetConversations(ApplicationUser currentUser)
        {
            try
            {
                // Looking for all conversations.
                var recipients = _appRepository.MessageRecipients.GroupBy(user => user.UserId).Where(id => id.Key == currentUser.Id).Select(id => id.Key).ToList();
                var messengers = _appRepository.Messages.GroupBy(message => message.FromUserId).Where(id => id.Key == currentUser.Id).Select(id => id.Key).ToList();

                var result = recipients.Union(messengers);

                return ToConversationViewModel(result);
            }
            catch (Exception exception)
            {
                // ToDo: exception
                throw;
            }
        }

        public async Task<List<ConversationViewModel>> GetConversationsAsync(ApplicationUser currentUser)
        {
            return await Task.Run(() => GetConversations(currentUser));
        }

        private List<ConversationViewModel> ToConversationViewModel(IEnumerable<string> userIds)
        {
            var resultCollection = new List<ConversationViewModel> { };

            foreach (var userId in userIds)
            {
                var user = _identityRepository.Users.FirstOrDefault(user => user.Id == userId);
                if (user != null)
                {
                    var userName = user.Lastname + " " + user.Firstname;

                    var model = new ConversationViewModel
                    {
                        UserName = userName,
                        UserId = userId
                    };

                    resultCollection.Add(model);
                }
                else
                {
                    // ToDo: log
                }
            }

            return resultCollection;
        }
    }
}
