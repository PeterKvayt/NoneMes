using Core.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AngularApp.Controllers.Api.Version1.Identity
{
    public sealed class JwtConfigurator : IAuthConfigurator
    {
        private UserManager<ApplicationUser> _userManager;

        public JwtConfigurator(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public string GetToken(string userEmail)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("DfMrHFBufj[388~F*d}nS7"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                // ToDo: remove settings to configuration
                issuer: "https://localhost:44347",
                audience: "https://localhost:44347",
                claims: GetClaims(userEmail).Result,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }

        private async Task<List<Claim>> GetClaims(string userEmail)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user != null)
            {
                List<Claim> claims = new List<Claim>()
                {
                  new Claim(ClaimTypes.Name, userEmail)
                };

                return claims;
            }

            return null;
        }
    }
}
