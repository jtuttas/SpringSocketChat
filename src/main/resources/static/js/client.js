let ws;

$(document).ready(function () {
  $("#anmelden").click(function (e) {
    console.log("Connect to " + window.location.hostname+" over "+location.protocol);
    if (location.protocol=="https") {
        ws = new WebSocket("wss://" + location.host + "/chat");
    }
    else {
        ws = new WebSocket("ws://" + location.host + "/chat");
    }
    ws.onmessage = function (e) {
      console.log("onmessage()" + JSON.stringify(e.data));
      printMessage(e.data);
    };
    ws.onopen = function() {
        let messageObject = {
          name: "system",
          message: $("#user").val()+" joined the Chat",
        };
        ws.send(JSON.stringify(messageObject));
    }
    $("#logindiv").addClass("hidden");
    $("#chatdiv").removeClass("hidden");
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
  $("#messages").append("<p>"+messageData.name + " : " + messageData.message+"</p>");

  /*
  let messages = document.getElementById("messages");
  let newMessage = document.createElement("div");
  newMessage.innerHTML = messageData.name + " : " + messageData.message;
  messages.appendChild(newMessage);
  */
}

function sendToGroupChat() {
  let messageText = document.getElementById("message").value;
  document.getElementById("message").value = "";
  let name = document.getElementById("name").value;
  let messageObject = {
    name: name,
    message: messageText,
  };
  ws.send(JSON.stringify(messageObject));
}
