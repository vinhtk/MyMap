using System;
using System.Web.Mvc;
using MyMapProject.Library.Provider;

namespace MyMapProject.App
{
    public partial class Map : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
            if (Request.IsAuthenticated)
            {
                AjaxPro.Utility.RegisterTypeForAjax(typeof(Library.Ajax.Map));
                AjaxPro.Utility.RegisterTypeForAjax(typeof(Library.API.Map));
                
            }
            else
            {
                Response.Redirect("~/Account/Login?returnUrl=" + Request.Url.LocalPath);
            }
        }

    }
}