using AngularApp.ViewModels.Identity;
using Core.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;

namespace AngularApp.Controllers.Identity
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountsController : Controller
    {
        private UserManager<ApplicationUser> _userManager;

        public AccountsController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async void Register(RegisterViewModel model)
        {
            if (model == null)
            {
                // ToDo: log
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }

            if (ModelState.IsValid)
            {
                // ToDo: converter
                var user = new ApplicationUser
                {
                    Email = model.Email,
                    UserName = model.Email,
                    Firstname = model.Firstname,
                    Lastname = model.Lastname,
                    Patronomic = model.Patronymic
                };

                try
                {
                    var result = await _userManager.CreateAsync(user, model.Password);

                    if (!result.Succeeded)
                    {
                        // ToDo: log
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    }
                }
                catch (Exception)
                {
                    // ToDo: log
                    Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                }
            }
            else
            {
                // ToDo: log
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
        }
    }
}
