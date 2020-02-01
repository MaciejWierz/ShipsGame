var wybranepole = null;
var shipMap = new Map();
var rightShipMap = new Map();
var sunkenMap = new Map();
var rightSunkenMap = new Map();
var singleShipLeft = 3;
var doubleShipLeft = 2;
var tripleShipLeft = 1;
var amIPrepared = 0;
var isEnemyPrepared = 0;
var turn = 0;
var win = 0;
var lose = 0;


function markField() {
    //document.getElementById("debuglabel").textContent += this.id;
    if (wybranepole != null) document.getElementById(wybranepole).classList.remove("selected");

    document.getElementById(this.id).classList.add('selected');
    wybranepole = this.id;


    if (document.getElementById("checksingle").checked || document.getElementById("checkdouble").checked
        || document.getElementById("checktriple").checked && amIPrepared == 0) setShip();


}



function setShip() {
    //document.getElementById("debuglabel").textContent += "SetShip - " + wybranepole;
    if (wybranepole != null) {
        var playertmp = wybranepole.substr(0, 1);
        var x = wybranepole.substr(2);
        var y = wybranepole.substr(1, 1);

        if (document.getElementById("checksingle").checked == true && checkSuorrundingFields(wybranepole) == 0) {
            if (shipMap.get(wybranepole) == 0 && singleShipLeft > 0) {
                document.getElementById(wybranepole).src = "icons/1ship.bmp";
                shipMap.set(wybranepole, 1);
                singleShipLeft--;
            } else if (shipMap.get(wybranepole) == 1) {
                document.getElementById(wybranepole).src = "icons/empty.bmp";
                shipMap.set(wybranepole, 0);
                singleShipLeft++;
            }
            document.getElementById("singleShipLeftLbl").textContent = singleShipLeft;
        }

        if (document.getElementById("checkdouble").checked == true && !(x == 0 && y == 0)) {

            if (playertmp == "L" && checkSuorrundingFields(wybranepole) == 0 && checkSuorrundingFields("L" + (parseInt(y, 10) - 1) + x) == 0 && y > 0) {

                if (doubleShipLeft > 0) {
                    document.getElementById(wybranepole).src = "icons/313ship.bmp";
                    shipMap.set(wybranepole, 21);
                    document.getElementById("L" + (parseInt(y, 10) - 1) + x).src = "icons/311ship.bmp";
                    shipMap.set("L" + (parseInt(y, 10) - 1) + x, 211);
                    doubleShipLeft--;
                }

            }
            else if (playertmp == "L" && (shipMap.get(wybranepole) == 21 || (shipMap.get(wybranepole) == 0 && y == 0))) {
                document.getElementById("debuglabel").textContent += (checkSuorrundingFields("L" + y + (parseInt(x, 10) - 1)) == 0) + (x > 0) + (y == 0);
                if (x > 0 && checkSuorrundingFields("L" + y + (parseInt(x, 10) - 1)) == 2 && y != 0) {
                    document.getElementById(wybranepole).src = "icons/323ship.bmp";
                    shipMap.set(wybranepole, 22);
                    document.getElementById("L" + y + (parseInt(x, 10) - 1)).src = "icons/321ship.bmp";
                    shipMap.set("L" + y + (parseInt(x, 10) - 1), 221);
                    document.getElementById("L" + (parseInt(y, 10) - 1) + x).src = "icons/empty.bmp";
                    shipMap.set("L" + (parseInt(y, 10) - 1) + x, 0);

                }
                else if (y == 0 && checkSuorrundingFields("L" + y + (parseInt(x, 10) - 1)) == 0 && x > 0) {
                    doubleShipLeft--;
                    document.getElementById(wybranepole).src = "icons/323ship.bmp";
                    shipMap.set(wybranepole, 22);
                    document.getElementById("L" + y + (parseInt(x, 10) - 1)).src = "icons/321ship.bmp";
                    shipMap.set("L" + y + (parseInt(x, 10) - 1), 221);
                }
                else {
                    document.getElementById(wybranepole).src = "icons/empty.bmp";
                    shipMap.set(wybranepole, 0);
                    document.getElementById("L" + (parseInt(y, 10) - 1) + x).src = "icons/empty.bmp";
                    shipMap.set("L" + (parseInt(y, 10) - 1) + x, 0);
                    doubleShipLeft++;
                }
            } else if (playertmp == "L" && shipMap.get(wybranepole) == 22) {
                document.getElementById(wybranepole).src = "icons/empty.bmp";
                shipMap.set(wybranepole, 0);
                document.getElementById("L" + y + (parseInt(x, 10) - 1)).src = "icons/empty.bmp";
                shipMap.set("L" + y + (parseInt(x, 10) - 1), 0);
                doubleShipLeft++;

            }

            document.getElementById("doubleShipLeftLbl").textContent = doubleShipLeft;
        }


        console.log((checkSuorrundingFields("L" + y + (parseInt(x, 10) - 1)) == 321) +"|"+ (checkSuorrundingFields("L" + y + (parseInt(x, 10) + 1)) == 323) +"|"+ (checkSuorrundingFields(wybranepole) == 0) +"|"+ (tripleShipLeft > 0));
        if (document.getElementById("checktriple").checked == true ) {
            if (checkSuorrundingFields("L" + (parseInt(y, 10) - 1) + x) == 0 && checkSuorrundingFields("L" + (parseInt(y, 10) + 1) + x) == 0 && y > 0 && y < 9 && checkSuorrundingFields(wybranepole) == 0 && tripleShipLeft > 0)// góra i dół czysta
            {
                shipMap.set("L" + (parseInt(y, 10) - 1) + x, 311); document.getElementById("L" + (parseInt(y, 10) - 1) + x, 312).src = "icons/311ship.bmp";
                shipMap.set(wybranepole, 312); document.getElementById(wybranepole).src = "icons/312ship.bmp";
                shipMap.set("L" + (parseInt(y, 10) + 1) + x, 313); document.getElementById("L" + (parseInt(y, 10) + 1) + x, 312).src = "icons/313ship.bmp";
                tripleShipLeft--;
                document.getElementById("tripleShipLeftLbl").textContent = tripleShipLeft;
            }
            else if (shipMap.get("L" + (parseInt(y, 10) - 1) + x) == 311 && shipMap.get("L" + (parseInt(y, 10) + 1) + x) == 313)// góra i dół zajęte
            {
                shipMap.set("L" + (parseInt(y, 10) - 1) + x, 0); document.getElementById("L" + (parseInt(y, 10) - 1) + x).src = "icons/empty.bmp";
                shipMap.set(wybranepole, 0); document.getElementById(wybranepole).src = "icons/empty.bmp";
                shipMap.set("L" + (parseInt(y, 10) + 1) + x, 0); document.getElementById("L" + (parseInt(y, 10) + 1) + x).src = "icons/empty.bmp";
                if (x > 0 && x < 9) {

                    shipMap.set("L" + y + (parseInt(x, 10) - 1), 321); document.getElementById("L" + y + (parseInt(x, 10) - 1)).src = "icons/321ship.bmp";
                    shipMap.set(wybranepole, 322); document.getElementById(wybranepole).src = "icons/322ship.bmp";
                    shipMap.set("L" + y + (parseInt(x, 10) + 1), 323); document.getElementById("L" + y + (parseInt(x, 10) + 1)).src = "icons/323ship.bmp";


                } else tripleShipLeft++;

            }
            else if (shipMap.get("L" + y + (parseInt(x, 10) - 1)) == 321 && shipMap.get("L" + y + (parseInt(x, 10) + 1)) == 323)// prawo lewo zajete
            {
                tripleShipLeft++;
                shipMap.set("L" + y + (parseInt(x, 10) - 1), 0); document.getElementById("L" + y + (parseInt(x, 10) - 1)).src = "icons/empty.bmp";
                shipMap.set(wybranepole, 0); document.getElementById(wybranepole).src = "icons/empty.bmp";
                shipMap.set("L" + y + (parseInt(x, 10) + 1), 0); document.getElementById("L" + y + (parseInt(x, 10) + 1)).src = "icons/empty.bmp";

            }
            else if (checkSuorrundingFields("L" + y + (parseInt(x, 10) - 1)) == 0 && checkSuorrundingFields("L" + y + (parseInt(x, 10) + 1)) == 0 && checkSuorrundingFields(wybranepole) == 0 && tripleShipLeft > 0 && x<9 && x>0) { // prawo lewo wolne

                shipMap.set("L" + y + (parseInt(x, 10) - 1), 321); document.getElementById("L" + y + (parseInt(x, 10) - 1)).src = "icons/321ship.bmp";
                shipMap.set(wybranepole, 322); document.getElementById(wybranepole).src = "icons/322ship.bmp";
                shipMap.set("L" + y + (parseInt(x, 10) + 1), 323); document.getElementById("L" + y + (parseInt(x, 10) + 1)).src = "icons/323ship.bmp";
                tripleShipLeft--;
            }

            document.getElementById("tripleShipLeftLbl").textContent = tripleShipLeft;
            
        }
    }
}

function selectOnlyThisCheckBox(id) {

    document.getElementById("checksingle").checked = false;
    document.getElementById("checkdouble").checked = false;
    document.getElementById("checktriple").checked = false;
    document.getElementById(id).checked = true;

}

function checkSuorrundingFields(id) {

    var playertmp = id.substr(0, 1); if (playertmp == "P") return -1;
    var x = id.substr(2);
    var y = id.substr(1, 1);
    var statki = 0;

    if (shipMap.get("L" + y + (parseInt(x, 10) + 1)) > 0) statki++; // prawo 
    if (shipMap.get("L" + y + (parseInt(x, 10) - 1)) > 0) statki++;   // lewo
    if (shipMap.get("L" + (parseInt(y, 10) + 1) + x) > 0) statki++; // dol
    if (shipMap.get("L" + (parseInt(y, 10) - 1) + x) > 0) statki++;  // gora
    if (shipMap.get("L" + (parseInt(y, 10) - 1) + (parseInt(x, 10) + 1)) > 0) statki++; // prawo gora
    if (shipMap.get("L" + (parseInt(y, 10) + 1) + (parseInt(x, 10) + 1)) > 0) statki++; // prawo dol
    if (shipMap.get("L" + (parseInt(y, 10) - 1) + (parseInt(x, 10) - 1)) > 0) statki++; // lewo gora
    if (shipMap.get("L" + (parseInt(y, 10) + 1) + (parseInt(x, 10) - 1)) > 0) statki++; // lewo dol
    // document.getElementById("debuglabel").textContent += "|" + id + " Graniczy z :" + statki + " statkami|" ;

    return statki;
}

function endShipSetting() {
    if (singleShipLeft == 0 && doubleShipLeft == 0 && tripleShipLeft == 0) {


        var stringToSend = "";



        var iterator = shipMap[Symbol.iterator]();
        for (let item of iterator) {
            if (item[1] != 0) stringToSend += item + "|";
        }
        

        doSend("Set|" + gameid + "|" + player + "|" + stringToSend);

        amIPrepared = 1;
        document.getElementById("inGamePanel").style.display = "block";
        document.getElementById("settingShipsPanel").style.display = "none";
        if (isEnemyPrepared == 1 && player == 1) {
            turn = 1;
            document.getElementById("inGameLabel").textContent = "Twoja tura!";
            document.getElementById("inGameLabel").classList.add('inGameLabelGreen');
        } else if (isEnemyPrepared == 1 && player == 2) {
            document.getElementById("inGameLabel").textContent = "Tura przeciwnika";
            document.getElementById("inGameLabel").classList.add('inGameLabelRed');
            turn = 2;
        } else {
            document.getElementById("inGameLabel").classList.add('inGameLabelWhite');
        }


    }
    else {
        if (singleShipLeft > 0) document.getElementById("checksingle").classList.add("validatecheckbox");
        if (doubleShipLeft > 0) document.getElementById("checkdouble").classList.add("validatecheckbox");  /// Dodać 3. stateek
        if (tripleShipLeft > 0) document.getElementById("checkdouble").classList.add("validatecheckbox");
    }
}

function shoot() {

    if (wybranepole != null) {
        if (wybranepole.substr(0, 1) != "L" && isEnemyPrepared == 1 && turn == 1) {

            
            doSend("Shoot|" + gameid + "|" + player + "|" + wybranepole);
            document.getElementById("inGameLabel").classList.remove('inGameLabelGreen');
            document.getElementById("inGameLabel").textContent = "Tura przeciwnika";
            document.getElementById("inGameLabel").classList.add('inGameLabelRed');
            turn = 2;
            if (rightSunkenMap.get(wybranepole) == 0) {
                rightSunkenMap.set(wybranepole, 1);
                if (rightShipMap.get(wybranepole) > 0 && rightSunkenMap.get(wybranepole) == 1) {
                    document.getElementById(wybranepole).src = "icons/ayaya.jpg";
                    win++;
                    if (win >= 9) alert("Wygrałeś!");
                }
                else if (rightShipMap.get(wybranepole) == 0 && rightSunkenMap.get(wybranepole) == 1) document.getElementById(wybranepole).src = "icons/missed.bmp";
            }
        }
    } else if (isEnemyPrepared == 0) alert("przeciwnik nie jest gotowy");






    function endTurn() {


        var playertmp = wybranepole.substr(0, 1);
        var x = wybranepole.substr(2);
        var y = wybranepole.substr(1, 1);
        if (playertmp == "P" && rightShipMap.get(wybranepole) > 0) document.getElementById(wybranepole).src = "icons/ayaya.jpg";
        if (playertmp == "P" && rightShipMap.get(wybranepole) == 0) document.getElementById(wybranepole).src = "icons/missed.bmp";
        try { // strzał
            $.ajax({
                method: "post",
                type: "POST",
                url: 'WebForm1.aspx/shootShip',
                data: "{'msg': '" + y + x + "' , 'player': '" + player + "' , 'gameid': '" + gameid + "' }",    //player i gameid!!!!!
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {

                    try { // oddanie tury
                        $.ajax({
                            method: "post",
                            type: "POST",
                            url: 'WebForm1.aspx/endTurn',
                            data: "{'gameID': '" + gameid + "' }",    //player i gameid!!!!!
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {

                                alert(msg.d);
                            },
                            error: function () {
                                alert("coś się, coś się zepsuło - oddanie tury");
                            }

                        });
                    } catch (err) { document.getElementById("debuglabel").textContent += "Wyjątek: " + err.msg; }
                },
                error: function () {
                    alert("coś się, coś się zepsuło - strzał");
                }

            });
        } catch (err) { document.getElementById("debuglabel").textContent += "Wyjątek: " + err.msg; }





    }
}
