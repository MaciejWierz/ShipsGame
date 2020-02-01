
using SuperSocket.SocketBase;
using SuperWebSocket;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace statki3
{
    static class MyWebSocketServer
    {
        private static WebSocketServer wsServer;
        private static ArrayList sessions = new ArrayList();
        public static void StartServer()
        {
            wsServer = new WebSocketServer();
            int port = 3456;
            wsServer.Setup(port);
            wsServer.NewSessionConnected += WsServer_NewSesssionConnected;
            wsServer.NewMessageReceived += WsServer_NewMessageReceived;
            wsServer.NewDataReceived += WsServer_NewDataReceived;
            wsServer.SessionClosed += WsServer_SessionClosed;
            wsServer.Start();
            
            

        }

        private static void WsServer_SessionClosed(WebSocketSession session, CloseReason value)
        {
        }

        private static void WsServer_NewDataReceived(WebSocketSession session, byte[] value)
        {
        }

        private static void WsServer_NewMessageReceived(WebSocketSession session, string value)
        {
            WebSocketSession[] tmp = wsServer.GetAllSessions().ToArray();
            foreach(WebSocketSession s in tmp)
            s.Send(value);
            session.Send(value);

        }

        private static void WsServer_NewSesssionConnected(WebSocketSession session)
        {
            session.Send("Nawiązano połączenie");
            System.Diagnostics.Debug.WriteLine("Nowa sesja:" + session.SessionID);
        }

        public static void  StopServer()
        {
            wsServer.Stop();
        }

        /*
        private static void onFirstConnect(WebSocketSession session, string value)
        {
            string[] values = value.Split('|');
            System.Diagnostics.Debug.WriteLine("1: " + values[0] + " 2:" + values[1] + " 3:" + values[2] + "Ilosc GR: " + sessions.Count);
            Boolean isGameRoom = false;

            foreach (GameRoom r in sessions)
                if (r.gameID.Equals(values[1])) {
                    if (values[2].Equals("1")) {
                        System.Diagnostics.Debug.WriteLine("Przypisuje do:" + r.gameID + "Jako: P1");
                        r.sessionP1 = session;
                        if(r.sessionP2!=null)r.sessionP2.Send("Siemanko tutaj gracz 1");
                    }
                    else if (values[2].Equals("2")){
                        System.Diagnostics.Debug.WriteLine("Przypisuje do:" + r.gameID + "Jako: P2");
                        r.sessionP2 = session;
                        if (r.sessionP1 != null) r.sessionP1.Send("Siemanko tutaj gracz 2");
                    }
                        isGameRoom = true;
                    System.Diagnostics.Debug.WriteLine("Sprawdzam GR:" + r.gameID);
                    };

            if (!isGameRoom)
            {
                System.Diagnostics.Debug.WriteLine("Tworze nowy GR: " + values[1]);
                GameRoom newGR = new GameRoom();
                newGR.gameID = values[1];
                if (values[2].Equals("1")) newGR.sessionP1 = session;
                else if (values[2].Equals("2")) newGR.sessionP2 = session;
                sessions.Add(newGR);

            }
        }
        */


    }
}
