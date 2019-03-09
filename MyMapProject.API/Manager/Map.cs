
using System;
using MyMapProject.Library.Model;
using MyMapProject.Library.Provider;
using System.Collections.Generic;

namespace MyMapProject.Library.Manager
{
    public class Map
    {
    
        MapProvider MapProvider = new MapProvider();


        /// <summary>
        /// get info User
        /// </summary>
        /// <param name="name"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public string[] getUser(string name, string id)
        {
            var User = new List<string>();
            User.Add(name);
            User.Add(id);
            return User.ToArray();
        }


        //***********************   MANAGER POINT   ************************//        



        /// <summary>
        /// Insert new Points
        /// </summary>
        /// <param name="IdUser"></param>
        /// <param name="NamePoint"></param>
        /// <param name="Lat"></param>
        /// <param name="Lg"></param>
        /// <param name="Inform"></param>
        /// <param name="Address"></param>
        /// <returns></returns>
        public string Create(string IdUser, string NamePoint, double Lat, double Lg, string Inform, string Address)
        {


            Point Point = new Point
            {

                IdUser = IdUser,
                NamePoint = NamePoint,
                Lat = Lat,
                Lg = Lg,
                Inform = Inform,
                Address = Address
            };
            return MapProvider.Create(Point);

        }



        /// <summary>
        /// Find All Points in database
        /// </summary>
        /// <param name="IdUser"></param>
        /// <returns></returns>
        public IEnumerable<Point> FindAllPoints(string IdUser)
        {
            return MapProvider.FindAllPoints(IdUser);
        }



        /// <summary>
        /// Find Point with ID
        /// </summary>
        /// <param name="IdUser"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
        public IEnumerable<Point> FindPoint(string IdUser, string Id)
        {

            return MapProvider.FindPoint(IdUser, Id);
        }



        /// <summary>
        /// Update new Point
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="NamePoint"></param>
        /// <param name="Address"></param>
        /// <param name="Inform"></param>
        /// <returns></returns>
        public bool update(string Id, string NamePoint, string Address, string Inform)

        {
            if (MapProvider.Update(Id, NamePoint, Address, Inform))
            {
                return true;

            }
            else { return false; }
        }


        /// <summary>
        /// Remove Point with ID
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public bool remove(string Id)

        {
            var result = true;
            if (result)
            {


                if (Id != "")

                {
                    MapProvider.Remove(Id);
                }
                return false;

            }
            else { return false; }

        }




        //***********************   MANAGER PATH   ************************//


        /// <summary>
        /// Insert new Path
        /// </summary>
        /// <param name="IdUser"></param>
        /// <param name="Namepath"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public string CreatePath(string IdUser, string Namepath, string[] path)
        {

            if (path.Length != 0)
            {
                int Lengpoint = path.Length / 3;
                var arr = new List<PointPath>();

                for (var i = 0; i < path.Length; i = i + 3)
                {
                    int idArray = i / 3;
                    PointPath pts = new PointPath
                    {
                        NamePoint = path[i],
                        Lat = double.Parse(path[i + 1]),
                        Lg = double.Parse(path[i + 2]),
                    };
                    arr.Add(pts);

                }

                return MapProvider.CreatPath(IdUser, Namepath, arr.ToArray());
            }
            else
            {
                return "false";
            }
        }



        /// <summary>
        /// Find path with ID
        /// </summary>
        /// <param name="IdPath"></param>
        /// <returns></returns>
        public IEnumerable<Path> FindPath(string IdPath)
        {

            return MapProvider.FindPath(IdPath);
        }


        /// <summary>
        /// Find All Path in datbase with iduser
        /// </summary>
        /// <param name="IdUser"></param>
        /// <returns></returns>
        public IEnumerable<Path> FindAllPaths(string IdUser)
        {

            return MapProvider.FindAllPaths(IdUser);
        }



        /// <summary>
        /// Find Point with name, long, lat --> return idmongo
        /// </summary>
        /// <param name="idUser"></param>
        /// <param name="name"></param>
        /// <param name="Lat"></param>
        /// <param name="Lg"></param>
        /// <returns></returns>
        public IEnumerable<Point> GetId(string idUser, string name, double Lat, double Lg)
        {        
            return MapProvider.GetId(idUser, name, Lat, Lg);
        }
        /// <summary>
        /// Update Path
        /// </summary>
        /// <param name="NampePath"></param>
        /// <param name="IdUser"></param>
        /// <param name="Id"></param>
        /// <param name="Path"></param>
        /// <returns></returns>
        
        public string UpdatePath(string NampePath, string IdUser, string Id, string[] Path)
        {
            MapProvider.RemovePath(Id);
            return CreatePath(IdUser, NampePath, Path);
        }

        /// <summary>
        /// Remove Path with ID
        /// </summary>

        public bool RemovePath(string Id)

        {   
          return MapProvider.RemovePath(Id);
        }


    }

}




