
using MongoDB.Driver;
using System.Collections.Generic;
using System.Configuration;
using MyMapProject.Library.Model;
using MongoDB.Driver.Builders;
using MongoDB.Bson;
using System.Collections.ObjectModel;
using System;
using System.Collections;


namespace MyMapProject.Library.Provider
{
    public class MapProvider
    {
        private static string ConnectionString = ConfigurationManager.ConnectionStrings["VDMSConnectionString"].ConnectionString;
        private static MongoUrl MongoUrl = MongoUrl.Create(ConnectionString);

        private MongoDatabase _database = new MongoClient(MongoUrl).GetServer().GetDatabase(MongoUrl.DatabaseName);


        //********** PROVIDER POINT ****************//



        /// <summary>

        /// Create Point
        /// </summary>

        /// <param name="point"></param>
        /// <returns></returns>
        public string Create(Point point)
        {

            _database.GetCollection<Point>("test5").Insert(point);
            return point._id;
        }


        /// <summary>

        /// FindAllPoints
        /// </summary>
        /// <param name="IdUser"></param>
        /// <returns></returns>
        public IEnumerable<Point> FindAllPoints(string IdUser)
        {
           return _database.GetCollection<Point>("test5").Find(Query.EQ("IdUser", IdUser));
        }

     

        /// <summary>

        /// FindPoint with ID
        /// </summary>
        /// <param name="IdUser"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
        public IEnumerable<Point> FindPoint(string IdUser,string Id)

        { 
            return _database.GetCollection<Point>("test5").Find(Query.And(Query.EQ("IdUser", IdUser), Query.EQ("_id", ObjectId.Parse(Id))));
        }



        /// <summary>

        /// Update Point
        /// </summary>

        /// <param name="Id"></param>
        /// <param name="NamePoint"></param>
        /// <param name="Address"></param>
        /// <param name="Inform"></param>
        /// <returns></returns>
        public bool Update(string Id, string NamePoint, string Address, string Inform)
        {
           
            var result= _database.GetCollection("test5").Update(
            Query.EQ("_id", ObjectId.Parse(Id)),
                MongoDB.Driver.Builders.Update.Set("NamePoint", NamePoint).Set("Inform", Inform).Set("Address", Address),
                UpdateFlags.Upsert
                );
            return result.DocumentsAffected > 0;
        }



        /// <summary>
        /// Find Point with Name, long, lat --> return Id
        /// </summary>
        /// <param name="idUser"></param>
        /// <param name="name"></param>
        /// <param name="Lat"></param>
        /// <param name="Lg"></param>
        /// <returns> </returns>
        public IEnumerable<Point> GetId(string idUser,string name, double Lat, double Lg)
        {
           return _database.GetCollection<Point>("test5").Find(Query.And(Query.EQ("IdUser", idUser),Query.EQ("NamePoint", name), Query.EQ("Lat", Lat), Query.EQ("Lg", Lg))).SetFields("_id"); 
        }      


        /// <summary>

        /// Remove Point
        /// </summary>
        /// <param name="id"> id mongo </param>
        public void Remove(string id)

        {            
            _database.GetCollection("test5").Remove(Query.EQ("_id", ObjectId.Parse(id)));
        }


      
        

        //************** PROVIDER PATH ****************//

        /// <summary>

        /// Insert new Path

        /// <param name="IdUser"></param>
        /// <param name="Namepath"></param>
        /// <param name="arr"></param>
        /// <returns></returns>
        public string CreatPath(string IdUser, string Namepath, PointPath[] arr)
        { 
            Path ins = new Path
            {
                IdUser = IdUser,
                NamePath = Namepath,
                PointPath = arr
            };
            _database.GetCollection("Path1").Insert(ins);
            return ins._id;
        }



       
        /// <summary>

        /// Find Path with ID
        /// </summary>

        /// <param name="IdPath"></param>
        /// <returns></returns>
        public IEnumerable<Path> FindPath(string IdPath)
        {
             var documents = _database.GetCollection<Path>("Path1")
                .Find( Query.EQ("_id", ObjectId.Parse(IdPath)));
                return documents;
        }


        /// <summary>

        /// Find All Paths in database
        /// </summary>

        /// <param name="IdUser"></param>
        /// <returns></returns>        
        public IEnumerable<Path> FindAllPaths(string IdUser)
        {         
            var documents = _database.GetCollection<Path>("Path1").Find(Query.EQ("IdUser", IdUser));
            return documents;
        }



        /// <summary>

        /// Remove Path witn ID
        /// </summary>

        public bool RemovePath(string Id)
        {

           var result = _database.GetCollection("Path1").Remove((Query.EQ("_id", ObjectId.Parse(Id))));
           return result.DocumentsAffected> 0;
        }

       
    }

}
