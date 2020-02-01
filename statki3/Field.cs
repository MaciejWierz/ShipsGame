using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace statki3
{
    public class Field
    {
        public String jsID;
        public String ship;
        public String sunken;

        public static ArrayList CreateFieldArrayFromJS(String[] stringarr)
        {
            ArrayList fieldsFromJS = new ArrayList();
            int i = 0;
            foreach(String s in stringarr)
            {
                if (i < stringarr.Length-1)
                {

                                    if (s.Substring(0, 1).Equals("L"))
                                    {
                                        Field tmp = new Field();
                                        tmp.jsID = s.Substring(1, 2);
                                        tmp.ship = s.Substring(4, 1);
                                        tmp.sunken = "0";
                                        fieldsFromJS.Add(tmp);
                                    }
                }
                i++;
            }



            return fieldsFromJS;
        }
    }


}