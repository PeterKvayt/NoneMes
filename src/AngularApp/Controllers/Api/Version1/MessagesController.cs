﻿using Core.ViewModels;
using Core.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Interfaces;
using System;

namespace AngularApp.Controllers.Api.Version1
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class MessagesController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private IMessageService _messageService;

        public MessagesController(UserManager<ApplicationUser> userManager, IMessageService messageService)
        {
            _userManager = userManager;
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<IEnumerable<ConversationViewModel>> GetAllConversations()
        {
            if (User.Identity.IsAuthenticated)
            {
                var currentUser = GetCurrentAuthenticatedUser();

                if (currentUser != null)
                {
                    try
                    {
                        return await _messageService.GetConversationsAsync(currentUser);
                    }
                    catch (Exception exception)
                    {
                        // ToDo: exception
                        throw;
                    }
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.NotFound;
                    return null;
                }
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return null;
            }
        }

        [HttpGet("{participantId}")]
        public async Task<IEnumerable<MessageViewModel>> GetConversationMessages(string participantId)
        {
            if (User.Identity.IsAuthenticated)
            {
                var currentUser = GetCurrentAuthenticatedUser();

                if (currentUser != null)
                {
                    try
                    {
                        return await _messageService.GetConversationMessagesAsync(currentUser.Id, participantId);
                    }
                    catch (Exception exception)
                    {
                        // ToDo: exception
                        throw;
                    }
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.NotFound;
                    return null;
                }
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return null;
            }
        }

        /// <summary>
        /// Returns current authenticated user.
        /// </summary>
        /// <returns></returns>
        private ApplicationUser GetCurrentAuthenticatedUser()
        {
            var currentEmail = User.FindFirst(ClaimTypes.Name).Value;
            var currentUser = _userManager.Users.FirstOrDefault(p => p.Email == currentEmail);

            return currentUser;
        }
    }
}
