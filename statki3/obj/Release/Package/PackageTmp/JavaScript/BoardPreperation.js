var gameid =1;
var player = 1;
var cheats = 0;
var socketConnString = "";


function createBoards() {
    gameid = findGetParameter("gameID");
    player = findGetParameter("player");
    cheats = findGetParameter("cheat");

    try {
        $.ajax({
            method: "post",
            type: "POST",
            url: 'WebForm1.aspx/getNgrokCon',
            data: "{'msg': 'wiadomosc do serwera' }",    //player i gameid!!!!!
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                alert(msg.d);
                socketConnString = msg.d;
                websocket = new WebSocket("wss://" + socketConnString + ".ngrok.io");//("ws://localhost:3456");
                websocket.onopen = function (evt) { onOpen(evt) };
                websocket.onclose = function (evt) { onClose(evt) };
                websocket.onmessage = function (evt) { onMessage(evt) };
                websocket.onerror = function (evt) { onError(evt) };
            }

        });
    } catch (err) { alert("Błąd podczas pobierania adresu serwera websocket" + err.data); }




    
        
    if (cheats == null) cheats = 0;

    for (i = 0; i < 10; i++) {
        var row = document.createElement("row");
        row.classList.add("row");
        for (j = 0; j < 10; j++) {
            var nowy = new Image();
            nowy.ship = 0;
            nowy.src = "icons/empty.bmp";
            nowy.id = "L" + i + j;
            nowy.classList.add("field");
            nowy.onclick = markField;
            row.appendChild(nowy);
            shipMap.set(nowy.id, 0);
            sunkenMap.set(nowy.id, 0);
        }
        document.getElementById("boardLeft").appendChild(row);
    }
    for (i = 0; i < 10; i++) {
        var row = document.createElement("row");
        row.classList.add("row");
        for (j = 0; j < 10; j++) {
            var nowy = new Image();
            nowy.ship = 0;
            nowy.src = "icons/empty.bmp";
            nowy.id = "P" + i + j;
            nowy.classList.add("field");
            nowy.onclick = markField;
            row.appendChild(nowy);
            rightSunkenMap.set(nowy.id, 0); // potrzebne?
            rightShipMap.set(nowy.id, 0);
        }
        document.getElementById("boardRight").appendChild(row);
    }

    document.getElementById("checksingle").checked = false;
    document.getElementById("checkdouble").checked = false;
    document.getElementById("checktriple").checked = false;
    document.getElementById("singleShipLeftLbl").textContent = singleShipLeft;
    document.getElementById("doubleShipLeftLbl").textContent = doubleShipLeft;
    document.getElementById("tripleShipLeftLbl").textContent = tripleShipLeft; // Po dodaniu 3. statku

    document.getElementById("inGamePanel").style.display = "none";
}

function prepareBoards() {

/*
    //document.getElementById("debuglabel").textContent += "Player: " + player + "|||";
    try {
        $.ajax({
            method: "post",
            type: "POST",
            url: 'WebForm1.aspx/checkPreparation',
            data: "{'gameID': '" + gameid + "', 'player': '" + player + "'  }",                               //player i gameid!!!!!
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                amIPrepared = msg.d[0];
                isEnemyPrepared = msg.d[1];
                //document.getElementById("debuglabel").textContent += "Przygotowani: " + amIPrepared + "|" + isEnemyPrepared;

                if (amIPrepared == 0) { document.getElementById("inGamePanel").style.display = "none"; document.getElementById("settingShipsPanel").style.display = "block"; }
                else {
                    document.getElementById("inGamePanel").style.display = "block";
                    document.getElementById("settingShipsPanel").style.display = "none";
                    getLeftMap();
                }

                if (isEnemyPrepared == 1)
                    getRightMap();


            },
            error: function () {
                alert("coś się, coś się zepsuło   :(   ");
            }

        });
    } catch (err) { document.getElementById("debuglabel").textContent += "Wyjątek: " + err.msg; }


*/
  
}

function getRightMap() {

    try {
        $.ajax({
            method: "post",
            type: "POST",
            url: 'WebForm1.aspx/getEnemyMap',
            data: "{'gameID': '" + gameid + "', 'player': '" + player + "'  }",                               //player i gameid!!!!!
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                
                var shipsString = msg.d.split("|")[0];
                var sunkenString = msg.d.split("|")[1]
                var shipArr = shipsString.split("-");

                
                for (i = 0; i < shipArr.length; i++)
                    rightShipMap.set("P" + shipArr[i][0] + shipArr[i][1], shipArr[i][3]);
                for (i = 0; i < sunkenString.length; i = i + 2) 
                    rightSunkenMap.set("P" + sunkenString[i] + sunkenString[i + 1], 1);
                    
                
                

                /*var tmp = msg.d.split("|");
                //document.getElementById("Label1").textContent += "P:" + msg.d;;
                for (i = 0; i < 100; i++) {
                    rightShipMap.set("P" + tmp[i].split(",")[0], tmp[i].split(",")[1]);
                    rightSunkenMap.set("P" + tmp[i].split(",")[0], tmp[i].split(",")[2]);
                    
                }*/


                for (i = 0; i < 10; i++)
                    for (j = 0; j < 10; j++) {
                        //document.getElementById("Label1").textContent += cheats;
                        document.getElementById("P" + i + j).src = "icons/hidden.bmp";
                        //document.getElementById("debuglabel").textContent += i +""+ j + ">" + rightShipMap.get("P" + i + j) + "|";
                        if (cheats != 0) {
                            if (rightShipMap.get("P" + i + j) == 1) document.getElementById("P" + i + j).src = "icons/1ship.bmp";
                            else if (rightShipMap.get("P" + i + j) == 2 && rightShipMap.get("P" + (i + 1) + j) == 2) document.getElementById("P" + i + j).src = "icons/311ship.bmp";
                            else if (rightShipMap.get("P" + i + j) == 2 && rightShipMap.get("P" + (i - 1) + j) == 2) document.getElementById("P" + i + j).src = "icons/313ship.bmp";
                            else if (rightShipMap.get("P" + i + j) == 2 && rightShipMap.get("P" + i + (j + 1)) == 2) document.getElementById("P" + i + j).src = "icons/321ship.bmp";
                            else if (rightShipMap.get("P" + i + j) == 2 && rightShipMap.get("P" + i + (j - 1)) == 2) document.getElementById("P" + i + j).src = "icons/323ship.bmp";
                            else document.getElementById("P" + i + j).src = "icons/empty.bmp";
                            }
                        
                    }


                for (i = 0; i < 10; i++)
                    for (j = 0; j < 10; j++) {
                        if (rightShipMap.get("P" + i + j) > 0 && rightSunkenMap.get("P" + i + j) == 1) document.getElementById("P" + i + j).src = "icons/ayaya.jpg";
                        else if (rightShipMap.get("P" + i + j) == 0 && rightSunkenMap.get("P" + i + j) == 1) document.getElementById("P" + i + j).src = "icons/missed.bmp";
                    }

                if (checkEnd() == player) alert("Wygrana!");

            },
            error: function () {
                alert("coś się, coś się zepsuło   :(   ");
            }

        });
    } catch (err) { document.getElementById("debuglabel").textContent += "Wyjątek: " + err.msg; }
    


}

function getLeftMap() {
    try {
        $.ajax({
            method: "post",
            type: "POST",
            url: 'WebForm1.aspx/getMap',
            data: "{'gameID': '" + gameid + "', 'player': '" + player + "'  }",                               //player i gameid!!!!!
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                console.log("Przypisanie statków - wiadomosc od serwera: " + msg.d);
                var shipsString = msg.d.split("|")[0];
                var sunkenString = msg.d.split("|")[1]
                var shipArr = shipsString.split("-");

                //console.log("Przypisanie statkow - same statki: " + shipsString + "Ilosc statkow: " + shipArr.length);
                for (i = 0; i < shipArr.length; i++) 
                    shipMap.set("L" + shipArr[i][0] + shipArr[i][1], shipArr[i][3]);
                for (i = 0; i < sunkenString.length; i = i + 2)
                    sunkenMap.set("L" + sunkenString[i] + sunkenString[i + 1], 1);


                /*for (i = 0; i < 100; i++) { 
                    shipMap.set("L" + tmp[i].split(",")[0], tmp[i].split(",")[1]);
                    sunkenMap.set("L" + tmp[i].split(",")[0], tmp[i].split(",")[2]);
                   }*/


                for (i = 0; i < 10; i++)
                    for (j = 0; j < 10; j++) {
                        if (shipMap.get("L" + i + j) == 1) document.getElementById("L" + i + j).src = "icons/1ship.bmp";
                        else if (shipMap.get("L" + i + j) == 2 && shipMap.get("L" + (i + 1) + j) == 2) document.getElementById("L" + i + j).src = "icons/311ship.bmp";
                        else if (shipMap.get("L" + i + j) == 2 && shipMap.get("L" + (i - 1) + j) == 2) document.getElementById("L" + i + j).src = "icons/313ship.bmp";
                        else if (shipMap.get("L" + i + j) == 2 && shipMap.get("L" + i + (j + 1)) == 2) document.getElementById("L" + i + j).src = "icons/321ship.bmp";
                        else if (shipMap.get("L" + i + j) == 2 && shipMap.get("L" + i + (j - 1)) == 2) document.getElementById("L" + i + j).src = "icons/323ship.bmp";
                    }
                for (i = 0; i < 10; i++)
                    for (j = 0; j < 10; j++) {
                            if (shipMap.get("L" + i + j) > 0 && sunkenMap.get("L" + i + j) == 1) document.getElementById("L" + i + j).src = "icons/ayaya.jpg";
                            if (shipMap.get("L" + i + j) == 0 && sunkenMap.get("L" + i + j) == 1) document.getElementById("L" + i + j).src = "icons/missed.bmp";
                        }
                    

                var enemy;

                if (player == 1) enemy = 2;
                else if (player == 2) enemy = 1;
                if (checkEnd() == enemy) alert("Przegrana :(");

            },
            error: function () {
                alert("coś się, coś się zepsuło   :(   ");
            }

        });
    } catch (err) { document.getElementById("debuglabel").textContent += "Wyjątek: " + err.msg; }
}


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function checkEnd() { // działa asynchronicznie i trzeba oddzielnie sprawdzać graczy
    var win = 0;
    var lose = 0;
    var enemy;

    if (player == 1) enemy = 2;
    else if (player == 2) enemy = 1;
    for (i = 0; i < 10; i++)
        for (j = 0; j < 10; j++) {
            //document.getElementById("Label1").textContent += "P" + i + j +"|";
            if (rightSunkenMap.get("P" + i + j) > 0) win++;
            if (sunkenMap.get("L" + i + j) > 0) lose++;
        }


    if (win == 9 && lose == 9) { return -1; }
    if (win == 9) {
        return player;
    }
    if (lose == 9) {
        return enemy;
    }
    return 0;
}



function SetEnemyMap(msgs){

   
    for (i = 3; i < msgs.length - 1; i++) {
        var shipString = msgs[i].split(",")[1];
        console.log(shipString);
        rightShipMap.set("P" + msgs[i][1] + msgs[i][2], shipString);
    }
    for (i = 0; i < 10; i++)
        for (j = 0; j < 10; j++) {
            
            //document.getElementById("Label1").textContent += cheats;
            document.getElementById("P" + i + j).src = "icons/hidden.bmp";
            //document.getElementById("debuglabel").textContent += i +""+ j + ">" + rightShipMap.get("P" + i + j) + "|";
            if (cheats != 0) {
                if (rightShipMap.get("P" + i + j) == 1) document.getElementById("P" + i + j).src = "icons/1ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 211) document.getElementById("P" + i + j).src = "icons/311ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 21)  document.getElementById("P" + i + j).src = "icons/313ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 221) document.getElementById("P" + i + j).src = "icons/321ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 22)  document.getElementById("P" + i + j).src = "icons/323ship.bmp";

                else if (rightShipMap.get("P" + i + j) == 311) document.getElementById("P" + i + j).src = "icons/311ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 312) document.getElementById("P" + i + j).src = "icons/312ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 313) document.getElementById("P" + i + j).src = "icons/313ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 321) document.getElementById("P" + i + j).src = "icons/321ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 322) document.getElementById("P" + i + j).src = "icons/322ship.bmp";
                else if (rightShipMap.get("P" + i + j) == 323) document.getElementById("P" + i + j).src = "icons/323ship.bmp";
                else document.getElementById("P" + i + j).src = "icons/empty.bmp";
            }

        }
    isEnemyPrepared = 1;

    if (amIPrepared == 1 && player == 1) {
        document.getElementById("inGameLabel").textContent = "Twoja tura!";
        document.getElementById("inGameLabel").classList.add('inGameLabelGreen');
        document.getElementById("inGameLabel").classList.remove('inGameLabelWhite');
        turn = 1;
    } else if (amIPrepared == 1 && player == 2) {
        document.getElementById("inGameLabel").textContent = "Tura przeciwnika";
        document.getElementById("inGameLabel").classList.add('inGameLabelRed');
        turn = 2;
    } 


}

