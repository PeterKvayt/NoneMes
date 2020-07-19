using AngularApp.ViewModels.Identity;
using Core.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AngularApp.Controllers.Identity
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public AccountsController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task Register(RegisterViewModel model)
        {
            if (model == null)
            {
                // ToDo: log
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return;
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

                    if (!result.Succeeded || result.Errors.Count() > 0)
                    {
                        // ToDo: log
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    }
                }
                catch (Exception exception)
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

        [HttpPost("login")]
        public async Task Login(LoginViewModel model)
        {
            if (model == null)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return;
            }

            if (ModelState.IsValid)
            {
                bool lockoutIfFailureSignIn = false;

                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutIfFailureSignIn);

                if (result.Succeeded)
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                }
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
        }
    }
}
