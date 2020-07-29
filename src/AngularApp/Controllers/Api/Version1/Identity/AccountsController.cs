using Core.ViewModels.Identity;
using Core.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AngularApp.Controllers.Api.Version1.Identity
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountsController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private IAuthConfigurator _authConfigurator;

        public AccountsController(
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager,
            IAuthConfigurator authConfigurator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authConfigurator = authConfigurator;
        }

        [HttpPost("register")]
        //[ValidateAntiForgeryToken]
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

        [HttpPost("signIn")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> SignIn(SignInViewModel model)
        {
            if (model == null)
            {
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                bool lockoutIfFailureSignIn = false;

                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutIfFailureSignIn);

                if (result.Succeeded)
                {
                    var token = _authConfigurator.GetToken(model.Email);

                    return Ok(token);
                }
                else
                {
                    //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return BadRequest();
                }
            }
            else
            {
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest();
            }
        }
    }
}
