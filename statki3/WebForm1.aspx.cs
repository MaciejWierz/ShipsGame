using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace statki3
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        DBConnect db = DBConnect.GetInstance();
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        [WebMethod]
        public static String getNgrokCon(String msg)
        {
            System.Diagnostics.Debug.WriteLine("Pobieram NgrokString " + msg);
            DBConnect db = DBConnect.GetInstance();


            return db.GetNgrokConString();
        }










    }



}