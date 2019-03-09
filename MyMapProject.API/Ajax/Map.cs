using System;
using System.Web.Http;
using System.Collections.Generic;
using MyMapProject.Library.Model;
using MyMapProject.Library.Provider;
using MyMapProject.Library.API;
using AjaxPro;
using Microsoft.AspNet.Identity;
using System.Collections;


namespace MyMapProject.Library.Ajax
{
    public class Map : ApiController
    {
        


        private static Manager.Map _mapManager = new Manager.Map();
        private static MapProvider _mapProvider = new MapProvider();
        private static API.Map _mapAPI = new API.Map();
        [AjaxMethod]
        public bool Hello(string name)
        {
            return User.Identity.IsAuthenticated;
        }

        /// <summary>
        /// Get Info User
        /// </summary>
        /// <returns></returns>
        [AjaxMethod]
        public string[] getUser()
        {
            return _mapManager.getUser(User.Identity.GetUserId(), User.Identity.GetUserName());

        }

      


        //**************************   AJAX POINT   *********************************

        /// <summary>
        /// Insert new Point
        /// </summary>
        /// <param name="NamePoint"></param>
        /// <param name="Lat"></param>
        /// <param name="Lg"></param>
        /// <param name="Inform"></param>
        /// <param name="Address"></param>
        /// <returns></returns>
        [AjaxMethod]
        public string Create(string NamePoint, double Lat, double Lg, string Inform, string Address)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.Create(User.Identity.GetUserId(), NamePoint, Lat, Lg, Inform, Address);
            }
            else { return null; }
        }

        /// <summary>
        /// Read All points database
        /// </summary>
        /// <returns></returns>
        [AjaxMethod]
        public IEnumerable<Point> FindAllPoints()
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.FindAllPoints(User.Identity.GetUserId());
            }
            else { return null; }
        }

        /// <summary>
        /// Find Point with name, long, lat --> Return id mongo
        /// </summary>
        /// <param name="name"></param>
        /// <param name="Lat"></param>
        /// <param name="Lg"></param>
        /// <returns></returns>
        [AjaxMethod]
        public IEnumerable<Point> GetId(string name, double Lat, double Lg)
        {
            return _mapManager.GetId(User.Identity.GetUserId(), name, Lat, Lg);
        }

        /// <summary>
        /// Find Point with ID
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AjaxMethod]
        public IEnumerable<Point> FindPoint(string Id)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.FindPoint(User.Identity.GetUserId(), Id);
            }
            else { return null; }
        }


        /// <summary>
        /// Update Point
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="NamePoint"></param>
        /// <param name="Address"></param>
        /// <param name="Inform"></param>
        /// <returns></returns>
        [AjaxMethod]
        public bool Update(string Id, string NamePoint, string Address, string Inform)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.update(Id, NamePoint, Address, Inform);
            }
            else { return false; }
        }


        /// <summary>
        /// Rove Point with ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AjaxMethod]
        public bool Remove(string id)
        {
            if (User.Identity.IsAuthenticated)
            {
                _mapManager.remove(id);
                return true;
            }
            else { return false; }

        }

        //*********************************  AJAX PATH   *******************************
        

        /// <summary>
        /// Insert new Path
        /// </summary>
        /// <param name="namepath"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        [AjaxMethod]
        public string CreatePath(string namepath, string[] path)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.CreatePath(User.Identity.GetUserId(), namepath, path);
            }

            else { return "false"; }
        }



        /// <summary>
        /// Find Path with ID
        /// </summary>
        /// <param name="idpath"></param>
        /// <returns></returns>
        [AjaxMethod]
        public IEnumerable<Path> FindPath(string idpath)
        {
            if (User.Identity.IsAuthenticated)
            {

                return _mapManager.FindPath(idpath);
            }
            else { return null; }
        }


        /// <summary>
        /// Find All path in databse
        /// </summary>
        /// <returns></returns>
        [AjaxMethod]
        public IEnumerable<Path> FindAllPaths()
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.FindAllPaths(User.Identity.GetUserId());
            }
            else
            {
                return null;
            }

        }

        /// <summary>
        /// Update Path
        /// </summary>
        /// <param name="Namepath"></param>
        /// <param name="id"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        [AjaxMethod]
        public string UpdatePath(string Namepath, string id, string[] path)
        {
            if (User.Identity.IsAuthenticated)
            {
                return _mapManager.UpdatePath(Namepath, User.Identity.GetUserId(), id, path);
            }
            else { return "false"; }

        }

        /// <summary>
        /// Remove Path with ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AjaxMethod]
        public bool RemovePath(string id)
        {
            if (User.Identity.IsAuthenticated)
            {
                _mapManager.RemovePath(id);
                return true;
            }
            else { return false; }
        }

        /// <summary>
        /// Return Page function Search All
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        [AjaxMethod]
        public int CountSearch(string key)
        {
            return _mapAPI.CountSearch(key);
        }

        /// <summary>
        /// SearchAll
        /// </summary>
        /// <param name="key"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        [AjaxMethod]
        public vietbandoAPI.VietBandoPOI[] Search(string key, int page)
        {
            return _mapAPI.Search(key, page);
        }

        /// <summary>
        /// WhatHere
        /// </summary>
        /// <param name="longitude"></param>
        /// <param name="latitude"></param>
        /// <returns></returns>
        [AjaxMethod]
        public vietbandoAPI.VietBandoPOI WhatHere(double longitude, double latitude)
        {
            return _mapAPI.WhatHere(longitude, latitude);
        }

        /// <summary>
        /// FindShortPath
        /// </summary>
        /// <param name="point"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [AjaxMethod]
        public vietbandoAPI.DirectionResult ShortPath(vietbandoAPI.Point[] point, vietbandoAPI.TransportType type)
        {
            return _mapAPI.ShortPath(point, type);
        }

        /// <summary>
        /// AutoSuggestSearch
        /// </summary>
        /// <param name="keysearch"></param>
        /// <returns></returns>
        [AjaxMethod]
        public string[] AutoSuggestSearch(string keysearch)
        {
            return _mapAPI.AutoSuggestSearch(keysearch);
        }

    }
}
