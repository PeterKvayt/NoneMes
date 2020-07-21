using Core.ViewModels;
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

namespace AngularApp.Controllers.Api.Version1
{
    [ApiController]
    [Route("api/v1/[controller]")]
    //[Authorize]
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
        public async Task<List<ConversationViewModel>> GetAllConversations()
        {
            if (User.Identity.IsAuthenticated)
            {
                var currentEmail = User.FindFirst(ClaimTypes.Name).Value;
                var currentUser = _userManager.Users.FirstOrDefault(p => p.Email == currentEmail);

                if (currentUser != null)
                {
                    return await _messageService.GetConversationsAsync(currentUser);
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
    }
}
