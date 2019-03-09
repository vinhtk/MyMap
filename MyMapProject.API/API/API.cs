using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Threading.Tasks;
using AjaxPro;
using MyMapProject.Library.vietbandoAPI;

namespace MyMapProject.Library.API
{
    public class API
    {
       [AjaxMethod]
        public VietBandoPOI[] Search(string key )
        {
            using (var client = new PartnerPortalSoapServiceClient())
            {
                using ( new OperationContextScope(client.InnerChannel))
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
        [AjaxMethod]
        public vietbandoAPI.DirectionResult ShortPath(vietbandoAPI.Point[] points, vietbandoAPI.TransportType type)
        {
            using (var client = new vietbandoAPI.PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = "7a285288-9691-4496-ba41-c702a1c587be";
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


    }
}
