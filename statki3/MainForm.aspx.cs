using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace statki3
{
    public partial class MainForm : System.Web.UI.Page
    { 
        private DBConnect db;
        protected void Page_Load(object sender, EventArgs e)
        {
            db = DBConnect.GetInstance();
            MyWebSocketServer.StartServer();

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