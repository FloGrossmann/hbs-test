
function togglePot(val) {
    sendBody({index: val});
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