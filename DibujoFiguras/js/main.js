window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp(){
    if (!canvasSupport()) {
        return;
    }
    var theCanvas = document.getElementById("canvas");
    var context = theCanvas.getContext("2d");

    function drawScene(){
        context.fillStyle = "#5599EE";
        context.fillRect(0, 0, canvas.width, canvas.height / 2);
        context.fillStyle = "#15dd5a";
        context.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

        context.fillStyle = "#fdef2a";
        context.fillRect(50, 100, 150, canvas.height / 2 - 50);

        context.fillStyle = "#51e9ff";
        context.strokeStyle = "#FFEEDD";
        context.lineWidth = 6;
        context.fillRect(60, 140, 80, 30);
        context.strokeRect(57, 140, 80, 30);
        context.fillRect(60, 220, 80, 30);
        context.strokeRect(57, 220, 80, 30);

        context.fillStyle = "#aa6a38";
        context.fillRect(150, 210, 40, 70);
        context.strokeStyle = "#222333";
        context.strokeRect(150, 210, 40, 70);

        context.fillStyle = "#988833";
        context.beginPath();
        context.arc(155, 250, 5, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }

    drawScene();

}
