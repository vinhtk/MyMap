using AjaxPro;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Web.Http;
//using System.Web.Http;

namespace VDMS_Training.Library.API
{
    public class MapApiController: ApiController
    {
        public MapApiController()
        {
        }

        public vietbandoAPI.VietBandoPOI Hello(vietbandoAPI.VietBandoPOI poi)
        {
            return poi;
        }

        public vietbandoAPI.VietBandoPOI[] Search(string searchKey)
        {
            using (var client = new vietbandoAPI.PartnerPortalSoapServiceClient())
            {
                using (new OperationContextScope(client.InnerChannel))
                {
                    // Add a HTTP Header to an outgoing request
                    HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                    requestMessage.Headers["RegisterKey"] = "2ca80267-ff8a-4ace-96cc-b8a0013f1227";
                    OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;

                    var res = client.SearchAll(searchKey, 1, 50, 106.22, 11.036, 107.134, 10.63, false);

                    if (res != null && res.List.Length > 0)
                    {
                        return res.List;
                    }
                    return new vietbandoAPI.VietBandoPOI[] { };
                            
                }
            }
        }
    }
}
