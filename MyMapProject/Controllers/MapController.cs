using System.Collections.Generic;
using System.Web.Http;
using MyMapProject.Library.Model;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;

namespace MyMapProject.Library.API
{
    [Route("api/map")]
    public class MapController : ApiController
    {

        private ApplicationUserManager _userManager;

        private static Manager.Map _mapManager = new Manager.Map();

        public MapController()
        {

        }

        public MapController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }


        [Authorize]
        [HttpPost]
        [Route("api/map/findallpoints")]
        public IEnumerable<Point> FindAllPoints()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            return _mapManager.FindAllPoints(user.Id);
        }





        [HttpGet]
        [Route("api/map/search")]
        public vietbandoAPI.VietBandoPOI[] search(string key)
        {
            var api = new MyMapProject.Library.API.Map();
            return api.Search_Mobile(key);
        }

        [HttpPost]
        [Route("api/map/FindShortPath")]
        public vietbandoAPI.DirectionResult FindShortPath(vietbandoAPI.Point[] points, vietbandoAPI.TransportType type)
        {
            var api = new API();
            return api.ShortPath(points, type);
        }
        [Authorize]
        [HttpPost]
        [Route("api/map/InsertPoint")]
        public string Create(string NamePoint, double Lat, double Lg, string Inform, string Address)
        {
            if (User.Identity.IsAuthenticated)
            {
                _mapManager.Create(User.Identity.GetUserId(), NamePoint, Lat, Lg, Inform, Address);
                return "true";
            }
            return null;
        }
        [Authorize]
        [HttpPost]
        [Route("api/map/DeletePoint")]
        public bool DeletePoint(string id)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.remove(id);
            }
            return false;
        }

        [Authorize]
        [HttpPost]
        [Route("api/map/UpdatePoint")]
        public bool UpdatePoint(string id, string NamePoint, string Address, string Inform)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.update(id, NamePoint, Address, Inform);
            }
            return false;
        }
        [Authorize]
        [HttpPost]
        [Route("api/map/LoadStreetSaved")]
        public IEnumerable<Path> LoadStreetSaved()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = UserManager.FindById(User.Identity.GetUserId());
                return _mapManager.FindAllPaths(user.Id);
            }
            return null;
        }

        [Authorize]
        [HttpPost]
        [Route("api/map/CreateStreet")]
        public string CreateStreet(string name, string[] path)
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = UserManager.FindById(User.Identity.GetUserId());
                return _mapManager.CreatePath(user.Id, name, path);

            }
            return "false";
        }
        [Authorize]
        [HttpPost]
        [Route("api/map/DeleteStreet")]
        public bool DeleteStreet(string id)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.RemovePath(id);
            }
            return false;
        }

    }
}
