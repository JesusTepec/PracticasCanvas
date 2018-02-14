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
    var shapeActual = "";
    var color = "#000000"

    function dibujarLinea(data) {
        context.beginPath();
        context.moveTo(data.x1, data.y1);
        context.lineTo(data.x2, data.y2);
        context.stroke();
    }

    function drawScene(data){
        context.lineWidth = 2;
        context.strokeStyle = color;
        if(shapeActual === "Linea"){
            dibujarLinea(data);
        }
    }

    $("#linea").click(function (e) {
        shapeActual = "Linea";
        color = $("#inputColor").val();
        var data = {x1: $("#coordX").val(), x2: $("#coordXx").val(), y1: $("#coordY").val(), y2: $("#coordYy").val()};
        drawScene(data);
    });

    drawScene({});

}
