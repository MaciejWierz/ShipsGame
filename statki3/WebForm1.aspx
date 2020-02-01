<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="statki3.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="game.css" rel="stylesheet" />
    <script src="JavaScript/GameControl.js"></script>
    <script src="JavaScript/BoardPreperation.js"></script>
    <script src="JavaScript/WebSocketControl.js"></script>
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <link rel="shortcut icon" type="image/ico" href="icons/favicon.ico" /> 
    <title>Statki</title>
</head>
<body onload=" createBoards(); prepareBoards(); ">
<form id="form1" runat="server">
       


        <asp:Label runat="server" ID="debuglabel" Text=""></asp:Label>
        <asp:Label runat="server" ID="Label1" Text=""></asp:Label>
    <div id ="panel1">


          



            <div id="boards">
          
                <div id ="boardsPanel">
                    <div class="boardPanelLeft" id="boardLeft">
                    

                    </div>
                    <div class="boardPanelRight" id="boardRight">
                    

                    </div>
                </div>

            </div>
        

        </div>


       <div id ="settingShipsPanel" class="interfacePanel">
                 <span class="interfaceLabel">Wybierz rodzaj statku: </span>
                <div>
                        <label class="checkboxContainer firstCheckbox">
                            <label id="singleShipLeftLbl" class="interfaceLabel"></label>
                            <input type="checkbox" id="checksingle"  onclick="selectOnlyThisCheckBox(this.id)"/>
                            <span></span>
                        </label>
                </div>

                <div> 
                        <label class="checkboxContainer secondCheckbox">
                            <label id="doubleShipLeftLbl" class="interfaceLabel"></label>
                            <input type="checkbox" id="checkdouble" onclick="selectOnlyThisCheckBox(this.id)"/>
                            <span></span>
                        </label>
                </div>

                <div>
                        <label class="checkboxContainer thirdCheckbox">
                            <label id="tripleShipLeftLbl" class="interfaceLabel"></label>
                            <input type="checkbox" id="checktriple" onclick="selectOnlyThisCheckBox(this.id)" />
                            <span></span>
                        </label>
                </div>

                 <input type="button" value ="Ustaw" onclick="setShip();" id ="setShipbtn"/>

                 <div><input type="button" value ="Zakończ ustawianie" onclick="endShipSetting();" id="setShipsToServerbtn"/></div>
             </div>

        <div id ="inGamePanel" class="interfacePanel">
            <label id="inGameLabel">Przeciwnik nie jest gotowy</label>
            <input type="button" value="Strzał" onclick ="shoot();" id="shootbtn"/>
        </div>


    </form>
</body>
</html>
