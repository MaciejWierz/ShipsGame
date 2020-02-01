<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainForm.aspx.cs" Inherits="statki3.MainForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="shortcut icon" type="image/ico" href="icons/favicon.ico" /> 
    <link href="MainPageStyle.css" rel="stylesheet" />
    <script src="JavaScript/MainFormScript.js"></script>
    <script src="JavaScript/WebSocketControl.js"></script>
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <title>STAAAATKIIII</title>
</head>
<body onload="connectToWebSocket();">
    <form id="form1" runat="server">
        
        <div class="loader">
            <img src="icons/762.gif" /> 
        </div>


        <div id="Web_1920___1" class ="loaderDarkerElements">
	<div id="Statki">
		<span>Statki</span>
	</div>
	<svg class="Rectangle_1">
		<rect fill="transparent" stroke="rgba(251,251,251,1)" stroke-width="1px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Rectangle_1" rx="0" ry="0" x="0" y="0" width="317" height="122">
		</rect>
	</svg>
	<div id="wci_nij_przycisk_aby_utworzy__">
		<span>wciśnij przycisk aby utworzyć grę</span>
	</div>

    
	<svg class="Rectangle_4">
		<rect fill="transparent" stroke="rgba(255,255,255,1)" stroke-width="1px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Rectangle_4" rx="0" ry="0" x="0" y="0" width="220" height="59">
		</rect>
	</svg>
	<div id="Utw_rz_gr__">
		<span><asp:label runat="server" Text="Utwórz grę!" ID="createGameLabel"></asp:label> </span>
	</div>
   

	<div id="http___macondev_pl_Webform1_as">
		<span> <asp:label runat="server" ID="secondPlayerLink" text=""> </asp:label></span>
	</div>
	<div id="Link_dla_drugiego_gracza_">
		<span>Link dla drugiego gracza:</span>
	</div>
	<svg class="Rectangle_6">
		<rect fill="transparent" stroke="rgba(255,255,255,1)" stroke-width="1px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Rectangle_6" rx="0" ry="0" x="0" y="0" width="361" height="51">
		</rect>
	</svg>
	<div id="autor_strony__Maciej_Wierzbick">
		<span>autor strony: Maciej Wierzbicki</span>
	</div>
</div>

        
        <asp:Button runat="server" ID ="startbtn" CssClass =" btn" OnClientClick="hideElements(); return false;"/>
        <asp:Label runat="server" ID="redirectLbl" CssClass="hidden" ></asp:Label>

    </form>



    <script type="text/javascript">

        window.addEventListener("load", function () {
            
            const loader = document.querySelector(".loader");
            loader.className += " hiddenloader";
            document.getElementById("Web_1920___1").className = "showUp";
        });

    </script>
</body>
</html>
