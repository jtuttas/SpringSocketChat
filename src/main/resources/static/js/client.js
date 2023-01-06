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
      console.log("onopen()");
      let messageObject = {
        name: "system",
        message: $("#user").val() + " joined the Chat",
      };
      ws.send(JSON.stringify(messageObject));
      ticker();
    };
    ws.onclose = function () {
      console.log("onclose()");
      let messageObject = {
        name: "system",
        message: $("#user").val() + " leave the Chat",
      };
      ws.send(JSON.stringify(messageObject));
      $("#logindiv").removeClass("hidden");
      $("#chatdiv").addClass("hidden");
    };
    ws.onerror = function (e) {
      console.log("onerror()" + JSON.stringify(e));
    };
    $("#logindiv").addClass("hidden");
    $("#chatdiv").removeClass("hidden");
  });

  $("#send").click(function (e) {
    console.log("Sende " + $("#inputsm").val());
    sendToGroupChat();
  });
});

function ticker() {
  console.log("tick");
  let messageObject = {
    name: "tick",
    message: "",
  };
  ws.send(null);
  setTimeout(function () {
    ticker();
  }, 3000);
}

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
  let messageText = $("#inputsm").val();
  $("#inputsm").val("");
  let name = $("#user").val();
  let messageObject = {
    name: name,
    message: messageText,
  };
  ws.send(JSON.stringify(messageObject));
}
