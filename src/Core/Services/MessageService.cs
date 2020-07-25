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
                    if (message.FromUserId == currentUserId)
                    {
                        idCollection.Add(recipient.UserId);
                    }
                    else
                    {
                        if (recipient.UserId == currentUserId)
                        {
                            idCollection.Add(message.FromUserId);
                        }
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
                var messages = GetAllMessagesWithParticipant(currentUserId, participant);
                return ToMessageViewModel(messages, currentUserId);
            }
            else
            {
                // ToDo: exception
                throw new Exception();
            }

        }

        public async Task<IEnumerable<MessageViewModel>> GetConversationMessagesAsync(string currentUserId, string participantId)
        {
            return await Task.Run(() => GetConversationMessages(currentUserId, participantId));
        }

        /// <summary>
        /// Returns all messages of conversation with participant.
        /// </summary>
        /// <param name="currentUserId">Current user id.</param>
        /// <param name="participant">Participant id.</param>
        /// <returns></returns>
        private IEnumerable<Message> GetAllMessagesWithParticipant(string currentUserId, ApplicationUser participant)
        {
            var resultMessageCollection = new List<Message> { };

            foreach (var message in _appRepository.Messages)
            {
                var recipient = _appRepository.MessageRecipients.FirstOrDefault(recipient => recipient.MessageId == message.Id);

                bool isCurrentUserSentMessageToParticipant = message.FromUserId == currentUserId && recipient.UserId == participant.Id;
                bool isParticipantSentMessageToCurrentUser = message.FromUserId == participant.Id && recipient.UserId == currentUserId;

                if (isCurrentUserSentMessageToParticipant || isParticipantSentMessageToCurrentUser)
                {
                    resultMessageCollection.Add(message);
                }
            }

            return resultMessageCollection;
        }

        // ToDo: Replace to converter.
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

        // ToDo: Replace to converter.
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

        public async Task AddMessageAsync(SendMessageViewModel message, ApplicationUser currentUser)
        {
            await Task.Run(() => AddMessage(message, currentUser));
        }

        public void AddMessage(SendMessageViewModel newMessage, ApplicationUser currentUser)
        {
            var message = new Message
            {
                FromUserId = currentUser.Id,
                DateSent = newMessage.DateSent,
                Context = newMessage.Context
            };
            try
            {
                _appRepository.Messages.Add(message);
                _appRepository.SaveChanges();
            }
            catch (Exception exception)
            {
                // ToDo: exception
                throw;
            }

            var recipient = new MessageRecipient
            {
                UserId = newMessage.RecipientUserId,
                MessageId = message.Id

            };
            try
            {
                _appRepository.MessageRecipients.Add(recipient);

                _appRepository.SaveChanges();
            }
            catch (Exception exception)
            {
                // ToDo: exception
                throw;
            }
        }

        public async Task<string> GetUserIdFromLoginAsync(string userLogin)
        {
            return await Task.Run(() => GetUserIdFromLogin(userLogin));
        }

        public string GetUserIdFromLogin(string userLogin)
        {
            return _userManager.Users.FirstOrDefault(user => user.Email == userLogin).Id;
        }
    }
}
