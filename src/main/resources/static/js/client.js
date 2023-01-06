let ws;

$(document).ready(function () {
  $("#anmelden").click(function (e) {
    console.log(
      "Connect to " + window.location.hostname + " over " + location.protocol
    );
    if (location.protocol == "https:") {
      ws = new WebSocket("wss://" + location.host + "/chat");
    } else {
      ws = new WebSocket("ws://" + location.host + "/chat");
    }
    ws.onmessage = function (e) {
      console.log("onmessage()" + JSON.stringify(e.data));
      printMessage(e.data);
    };
    ws.onopen = function () {
      let messageObject = {
        name: "system",
        message: $("#user").val() + " joined the Chat",
      };
      ws.send(JSON.stringify(messageObject));
    };
    $("#logindiv").addClass("hidden");
    $("#chatdiv").removeClass("hidden");
  });

  $("#send").click(function (e) { 
    console.log('Sende '+$("#inputsm").val());
    sendToGroupChat();    
  });
});

/*
function connect() {
  ws.onmessage = function (e) {
    console.log("onmessage()" + e.data);
    printMessage(e.data);
  };
  document.getElementById("connectButton").disabled = true;
  document.getElementById("connectButton").value = "Connected";
  document.getElementById("name").disabled = true;
}
*/

function printMessage(data) {
  let messageData = JSON.parse(data);
  if (messageData.name == "system") {
    $("#messages").append('<p class="system">' + messageData.message + "</p>");
  } else if (messageData.name == $("#user").val()) {
    $("#messages").append('<p class="self">' + messageData.message + "</p>");
  } else {
    $("#messages").append(
      '<p class="chatline"><span class="from">' +
        messageData.name +
        '</span><span class="frommsg">' +
        messageData.message +
        "</span></p>"
    );
  }
}

function sendToGroupChat() {
  let messageText =  $("#inputsm").val();
  $("#inputsm").val("");
  let name = $("#user").val();
  let messageObject = {
    name: name,
    message: messageText,
  };
  ws.send(JSON.stringify(messageObject));
}
