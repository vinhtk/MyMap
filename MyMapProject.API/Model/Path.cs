
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMapProject.Library.Model
{
    public class Path
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string NamePath { get; set; }
        public string IdUser { get; set; }        
        public PointPath[] PointPath { get; set; }	
}
    public class PointPath
    { 
        public string NamePoint { get; set; }
        public double Lat { get; set; }
        public double Lg { get; set; }
    }
    
}


