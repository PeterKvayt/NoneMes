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
                var result = GetAllDistinctParticipants(currentUser.Id);

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
        /// Return all messages, witch linked with user.
        /// </summary>
        /// <param name="currentUserId">Currnet user id.</param>
        /// <returns></returns>
        private IEnumerable<string> GetAllDistinctParticipants(string currentUserId)
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

            return idCollection.Distinct();
        }

        public IEnumerable<MessageViewModel> GetConversationMessages(string currentUserId, string participantId)
        {
            var messages = GetAllMessagesOfParticipant(currentUserId, participantId);

            return ToMessageViewModel(messages, currentUserId);
        }

        public async Task<IEnumerable<MessageViewModel>> GetConversationMessagesAsync(string currentUserId, string participantId)
        {
            return await Task.Run(() => GetConversationMessages(currentUserId, participantId));
        }

        /// <summary>
        /// Returns all messages of conversation with participant.
        /// </summary>
        /// <param name="currentUserId">Current user id.</param>
        /// <param name="participantId">Participant id.</param>
        /// <returns></returns>
        private IEnumerable<Message> GetAllMessagesOfParticipant(string currentUserId, string participantId)
        {
            var resultMessageCollection = new List<Message> { };

            ApplicationUser participant = null;
            try
            {
                participant = _userManager.Users.First(user => user.Id == participantId);
            }
            catch (Exception exception)
            {
                // ToDo: exception
                throw;
            }

            if (participant != null)
            {
                foreach (var message in _appRepository.Messages)
                {
                    var recipient = _appRepository.MessageRecipients.FirstOrDefault(recipient => recipient.MessageId == message.Id);

                    bool isCurrentUserSentMessageToParticipant = message.FromUserId == currentUserId && recipient.UserId == participantId;
                    bool isParticipantSentMessageToCurrentUser = message.FromUserId == participantId && recipient.UserId == currentUserId;

                    if (isCurrentUserSentMessageToParticipant || isParticipantSentMessageToCurrentUser)
                    {
                        resultMessageCollection.Add(message);
                    }
                }
            }
            else
            {
                // ToDo: log
            }

            return resultMessageCollection;
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

        private IEnumerable<MessageViewModel> ToMessageViewModel(IEnumerable<Message> messages, string currentUserId)
        {
            var resultCollection = new List<MessageViewModel> { };

            foreach (var message in messages)
            {
                var model = new MessageViewModel
                {
                    Owner = message.FromUserId == currentUserId ? true : false,
                    Context = message.Context,
                    DateSent = message.DateSent
                };

                resultCollection.Add(model);
            }

            return resultCollection;
        }
    }
}
