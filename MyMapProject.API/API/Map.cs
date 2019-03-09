using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AjaxPro;
using System.ServiceModel;
using System.ServiceModel.Channels;
using MyMapProject.Library.Model;
using MyMapProject.Library.vietbandoAPI;

namespace MyMapProject.Library.API
{
    public class Map
    {
        private readonly string _key = ConfigurationManager.AppSettings["VietbandoApiKey"] ?? "NOT_VALID_KEY";

        /// <summary>
        /// Return Numer Page Search All
        /// </summary>
        /// <param name="searchKey"></param>
        /// <returns></returns>
        public int CountSearch(string searchKey)
        {
            using (var client = new vietbandoAPI.PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = _key;
                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;
                    var res = client.SearchAll(searchKey, 1, 10, 0, 0, 0, 0, false);
                    return res.TotalCount;
                }
            }
        }

        /// <summary>
        /// Search All
        /// </summary>
        /// <param name="searchKey"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public vietbandoAPI.VietBandoPOI[] Search(string searchKey, int page)
        {
            using (var client = new vietbandoAPI.PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = _key;
                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;

                    var res = client.SearchAll(searchKey, page, 10, 0, 0, 0, 0, false);

                    if (res != null && res.List.Length > 0)
                    {
                        return res.List;
                    }
                    return new vietbandoAPI.VietBandoPOI[] { };
                }
            }
        }

        public VietBandoPOI[] Search_Mobile(string key)
        {
            using (var client = new PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = "7a285288-9691-4496-ba41-c702a1c587be";
                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;

                    var res = client.SearchAll(key, 1, 10, 106.50421142578125, 10.344642004246225, 106.7706298828125, 11.431571076012276, true);

                    if (res != null && res.List.Length > 0)
                    {

                        return res.List;

                    }

                    return new VietBandoPOI[] { };
                }
            }
        }
        /// <summary>
        /// What Here
        /// </summary>
        /// <param name="longitude"></param>
        /// <param name="latitude"></param>
        /// <returns></returns>
        public vietbandoAPI.VietBandoPOI WhatHere(double longitude, double latitude)
        {
            using (var client = new vietbandoAPI.PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = _key;
                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;
                    var res = client.WhatHere(longitude, latitude);
                    if (res.IsSuccess)
                    {
                        return res.Value;
                    }
                    return new vietbandoAPI.VietBandoPOI { };
                }
            }
        }

        /// <summary>
        /// FindSortPath
        /// </summary>
        /// <param name="points"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public vietbandoAPI.DirectionResult ShortPath(vietbandoAPI.Point[] points, vietbandoAPI.TransportType type)
        {
            using (var client = new vietbandoAPI.PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = _key;
                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;
                    var res = client.FindShortestPath(points, type, true);
                    if (res.IsSuccess)
                    {
                        return res.Value;
                    }
                    return new vietbandoAPI.DirectionResult { };
                }
            }
        }

        /// <summary>
        /// AutoSuggestSearch
        /// </summary>
        /// <param name="keysearch"></param>
        /// <returns></returns>
        public string[] AutoSuggestSearch(string keysearch)
        {
            using (var client = new vietbandoAPI.PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = _key;
                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;

                    var res = client.AutoSuggestSearch(keysearch);
                    if (res != null && res.List.Length > 0)
                    {
                        return res.List;
                    }
                    return new string[] { };
                }
            }
        }

    }
}
