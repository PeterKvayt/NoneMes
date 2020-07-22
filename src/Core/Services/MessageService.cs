using Core.Entities;
using Core.Identity;
using Core.Interfaces;
using Core.ViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Services
{
    public sealed class MessageService : IMessageService
    {
        private IAppRepository _appRepository;
        private UserManager<ApplicationUser> _userManager;

        public MessageService(IAppRepository appRepository, UserManager<ApplicationUser> userManager)
        {
            _appRepository = appRepository;
            _userManager = userManager;
        }

        public List<ConversationViewModel> GetConversations(ApplicationUser currentUser)
        {
            try
            {
                var result = GetAllLinkedMessages(currentUser.Id).Distinct();

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

        /// <summary>
        /// Return all messages, wich linked with user.
        /// </summary>
        /// <param name="currentUserId">Currnet user id.</param>
        /// <returns></returns>
        private IEnumerable<string> GetAllLinkedMessages(string currentUserId)
        {
            var idCollection = new List<string> { };

            foreach (var message in _appRepository.Messages)
            {
                MessageRecipient recipient = null;
                try
                {
                    recipient = _appRepository.MessageRecipients.FirstOrDefault(recipient => recipient.MessageId == message.Id);
                }
                catch (Exception exception)
                {
                    // ToDo: exception
                    throw;
                }

                if (recipient != null)
                {
                    if (message.FromUserId == currentUserId )
                    {
                        idCollection.Add(recipient.UserId);
                    }
                    else
                    {
                        idCollection.Add(message.FromUserId);
                    }
                }
                else
                {
                    // ToDo: log
                }
            }

            return idCollection;
        }

        private List<ConversationViewModel> ToConversationViewModel(IEnumerable<string> userIds)
        {
            var resultCollection = new List<ConversationViewModel> { };

            foreach (var userId in userIds)
            {
                var user = _userManager.Users.FirstOrDefault(user => user.Id == userId);
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
