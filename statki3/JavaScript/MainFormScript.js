var sessionID = "";
var waitingIntervalID;
var waiting = 0;
var socketConnString = "";
function hideElements() {
    var i = 0;
    console.log("halohalo");
    const loader = document.querySelector(".loader");
    loader.classList.remove("hiddenloader");
    document.getElementById("Web_1920___1").className = " loaderDarkerElements";



    doSend("GetMyID");


    waiting = 1;
    waitingIntervalID = window.setInterval(function () {
        doSend("WAIT|" + sessionID);
    }, 3000, true);

}

function connectToWebSocket() {

    try {
        $.ajax({
            method: "post",
            type: "POST",
            url: 'MainForm.aspx/getNgrokCon',
            data: "{'msg': 'wiadomosc do serwera' }",    //player i gameid!!!!!
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                socketConnString = msg.d;
                websocket = new WebSocket("wss://" + socketConnString + ".ngrok.io");//("ws://localhost:3456");
                websocket.onopen = function (evt) { onOpenWaiting(evt) };
                websocket.onclose = function (evt) { onClose(evt) };
                websocket.onmessage = function (evt) { onMessageWaiting(evt) };
                websocket.onerror = function (evt) { onError(evt) };
            }

        });
    } catch (err) { alert("Błąd podczas pobierania adresu serwera websocket" + err.data); }


}

function onOpenWaiting(evt){
    console.log("Nawiązano połączenie");
    doSend("Nawiązano połączenie")
}

function onMessageWaiting(evt) {

    var msgs = evt.data.split("|");

    if (msgs[0] != "WAIT" && msgs[0]!= "COME") {
        console.log(evt.data);
        sessionID = msgs[0];
    }
    if (msgs[0] == "WAIT" && msgs[1] != sessionID && waiting == 1) {
        console.log("Wysłano zaproszenie REDIRECT " + msgs[1]);
        window.clearInterval(waitingIntervalID);
        var newGameID = Math.floor(Math.random() * 100);
        doSend("COME|" + msgs[1] + "|" + newGameID);
        window.location.replace("http://macondev.pl/Webform1.aspx?gameID=" + newGameID + "&player=1");
    }
    if (msgs[0] == "COME" && msgs[1] == sessionID && waiting == 1) {
        console.log("Ortzymano zaproszenie REDIRECT " + msgs[1]);
        window.location.replace("http://macondev.pl/Webform1.aspx?gameID=" + msgs[2] + "&player=2");
    } 
    
}




