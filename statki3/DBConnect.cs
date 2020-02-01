using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace statki3
{
    public class DBConnect
    {
        //StaryConnectionString :  Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\Database1.mdf;Integrated Security=True

        MySqlConnectionStringBuilder conn_string = new MySqlConnectionStringBuilder();


        private static DBConnect instance = null;
        private DBConnect() {
            setConnString();

        }

        private void setConnString()
        {
            conn_string.Server = "mysql5.webio.pl";
            conn_string.UserID = "19036_deartlich";
            conn_string.Password = "E77!37Wb4ddC-6-";
            conn_string.Database = "19036_base";
        }
        public static DBConnect GetInstance()
        {
            if (instance == null) instance = new DBConnect();
            return instance;



        }




            
        

        public String GetNgrokConString()
        {

            setConnString();
            ArrayList fields = new ArrayList();
            using (MySqlConnection connection = new MySqlConnection(conn_string.ToString()))
            {


                connection.Open();
                MySqlCommand command = new MySqlCommand(("SELECT * FROM ngrok"), connection);
                MySqlDataReader reader = command.ExecuteReader();
                reader.Read();

                System.Diagnostics.Debug.WriteLine(reader[0].ToString());
                return reader[0].ToString();
                
                
            }

        }

       

       
    }


}