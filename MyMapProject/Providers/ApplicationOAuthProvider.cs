using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.OAuth;
using MongoDB.AspNet.Identity;
using MyMapProject.Models;

namespace MyMapProject.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        
        public ApplicationOAuthProvider(string publicClientId)
        {
            //_publicClientId = publicClientId ?? throw new ArgumentNullException(nameof(publicClientId));
            if(_publicClientId == publicClientId)
            {
                throw new ArgumentNullException(nameof(publicClientId));
            }
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();
            ApplicationUser user = null;
            try
            {
                user = userManager.Find(context.UserName, context.Password);
            }
            catch (Exception e)
            {
                context.SetError("server_error");
                context.Rejected();
                return base.GrantResourceOwnerCredentials(context);
            }

            if (user != null)
            {
                var identity =
                    userManager.CreateIdentity(user, DefaultAuthenticationTypes.ExternalBearer);

                context.Validated(identity);
            }
            else
            {
                context.SetError("invalid_grant", "Invalid User Id or password'");
                context.Rejected();
            }

            return base.GrantResourceOwnerCredentials(context);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return base.ValidateClientAuthentication(context);
        }

        

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
                else if (context.ClientId == "web")
                {
                    var expectedUri = new Uri(context.Request.Uri, "/");
                    context.Validated(expectedUri.AbsoluteUri);
                }
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            context.Validated();
            return base.ValidateTokenRequest(context);
        }
    }
}