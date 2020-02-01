function testWebSocket() {
    console.log(document.getElementById("wstest").value);
    websocket = new WebSocket(document.getElementById("wstest").value);
    websocket.onopen = function (evt) { onOpen(evt) };
    websocket.onclose = function (evt) { onClose(evt) };
    websocket.onmessage = function (evt) { onMessage(evt) };
    websocket.onerror = function (evt) { onError(evt) };


}
function onOpen(evt) {
    writeToScreen("CONNECTED");
    doSend("CON|" + gameid + "|" + player);
}

function onClose(evt) {
    writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
    //console.log(evt.data);

    var msgs = evt.data.split("|");

   
    //for (i = 0; i < msgs.length; i++) 
        //console.log(msgs[i] + ",");
    console.log("Odebrano: " + evt.data);
    if (msgs[2] != player && gameid == msgs[1])
        if (msgs[0] == "Set") SetEnemyMap(msgs);
        else if (msgs[0] == "Shoot") ExecuteEnemyShoot(msgs[3]);
}

function onError(evt) {
    writeToScreen(evt.data);
}

function doSend(message) {
    writeToScreen("SENT: " + message);
    websocket.send(message);
}

function writeToScreen(message) {
    console.log(message);
}


function ExecuteEnemyShoot(msgs) {
    var shootedShip = "L" + msgs[1] + msgs[2];
    console.log(shootedShip);
    document.getElementById("inGameLabel").classList.remove('inGameLabelRed');
    document.getElementById("inGameLabel").textContent = "Twoja tura!";
    document.getElementById("inGameLabel").classList.add('inGameLabelGreen');
    turn = 1;

    if (sunkenMap.get(shootedShip) == 0) {
            sunkenMap.set(shootedShip, 1);
            if (shipMap.get(shootedShip) > 0) {
                document.getElementById(shootedShip).src = "icons/ayaya.jpg";
                lose++;
                if (lose >= 9) alert("Przegrana :(");
            }
            if (shipMap.get(shootedShip) == 0) document.getElementById(shootedShip).src = "icons/missed.bmp";
        }
}

function getNgrokConn() {
    try {
        $.ajax({
            method: "post",
            type: "POST",
            url: 'WebForm1.aspx/getNgrokCon',
            data: "{'msg': 'wiadomosc do serwera' }",    //player i gameid!!!!!
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                socketConnString = msg.d;
            }

        });
    } catch (err) { alert("Błąd podczas pobierania adresu serwera websocket" + err.data); }
}