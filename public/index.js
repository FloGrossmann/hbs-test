var socket;

function togglePot(val) {
    socket.emit("msgToServer", val)
}

function sendBody(body) {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/update",
        data: body,
        success: function(value){
            $("#fireplaces").html(value);
        }
    });
}

function setupClient() {
    socket = io();
    socket.on('msgToClient', (message) => {
        $("#fireplaces").html(message);
    })
    socket.on('msgToClientWin', (message) => {
        if (message) {
            let element = document.getElementById("door");
            if (element) {
                element.classList.add("dooropening");
                element.classList.remove("doorclosed");
            }
        }
    })
    socket.on('msgToClientRestart', (message) => {
        if (message) {
            let element = document.getElementById("door");
            if (element) {
                element.classList.remove("dooropening");
                element.classList.add("doorclosed");
            }
        }
    })
}