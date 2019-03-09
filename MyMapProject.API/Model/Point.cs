using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Bson.Serialization.Attributes;

namespace MyMapProject.Library.Model
{

  
    [BsonIgnoreExtraElements]
    public class Point : PointPath
    {
        [BsonId]
       
        [BsonRepresentation(BsonType.ObjectId)]
        
        public string _id { get; set; }
        public string IdUser { get; set; }
        [BsonIgnoreIfNull]
        public string Inform { get; set; }
        public string Address { get; set; }
      
        
        //[BsonElement("NamePoint")]
        //public string Path { get; set; }
        [BsonExtraElements]
        public Dictionary<string,object> ExtraElements { get; set; }
    }
}