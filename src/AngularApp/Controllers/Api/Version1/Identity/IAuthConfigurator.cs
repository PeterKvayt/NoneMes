
namespace AngularApp.Controllers.Api.Version1.Identity
{
    public interface IAuthConfigurator
    {
        string GetToken(string userEmail);
    }
}
