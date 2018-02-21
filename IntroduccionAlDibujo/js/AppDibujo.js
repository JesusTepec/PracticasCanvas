window.addEventListener("load", eventWindowLoaded, false);
var shapeActual = "";

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
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var color = "#000000";
    var lineWidth = 1;
    var mouse = false;
    var estados = [0, 0, 0];
    var xTemp = 0;
    var yTemp = 0;
    shapeActual = "";

    function dibujarLinea(data) {
        console.log(data);
        if (estados[0]) {
            context.beginPath();
            context.moveTo(data.x1, data.y1);
        }
        if(estados[2]) {
            context.lineTo(data.x2, data.y2);
            context.stroke();
        }
    }

    function dibujarRectangulo(data) {
        context.strokeRect(data.x, data.y, data.w, data.h);
    }

    function borrador(coordenada) {
        var w = 20;
        var h = 20;
        context.clearRect(coordenada.x - 10, coordenada.y - 10, w, h);
    }

    function drawScene(coordenadas){
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        var data = {};
        switch (shapeActual){
            case "linea":
                if(!coordenadas.x) {
                    data = {
                        x1: $("#coordX").val(),
                        x2: $("#coordXx").val(),
                        y1: $("#coordY").val(),
                        y2: $("#coordYy").val()
                    };
                    estados = [1, 1, 1];
                    dibujarLinea(data);
                    estados = [0, 0, 0];
                } else {
                    if(estados[0]) {
                        data = {
                            x1: coordenadas.x,
                            x2: 0,
                            y1: coordenadas.y,
                            y2: 0
                        };
                        dibujarLinea(data);
                        $("#coordX").val(coordenadas.x);
                        $("#coordY").val(coordenadas.y);
                    }
                    if(estados[2]) {
                        data = {
                            x1: 0,
                            x2: coordenadas.x,
                            y1: 0,
                            y2: coordenadas.y
                        };
                        dibujarLinea(data);
                    }
                    $("#coordXx").val(coordenadas.x);
                    $("#coordYy").val(coordenadas.y);
                }
                break;
            case "rectangulo":
                if(!coordenadas.x) {
                    data = {
                        x: $("#rectX").val(),
                        y: $("#rectY").val(),
                        w: $("#rectW").val(),
                        h: $("#rectH").val()
                    };
                    dibujarRectangulo(data);
                } else {
                    if(estados[0]) {
                        xTemp = coordenadas.x;
                        yTemp = coordenadas.y;
                        $("#rectX").val(coordenadas.x);
                        $("#rectY").val(coordenadas.y);
                    }
                    if(estados[2]) {
                        data = {
                            x: xTemp,
                            y: yTemp,
                            w: coordenadas.x - xTemp,
                            h: coordenadas.y - yTemp
                        };
                        dibujarRectangulo(data);
                    }
                    $("#rectW").val(coordenadas.x);
                    $("#rectH").val(coordenadas.y);
                }
                break;
            case "borrador":
                borrador(coordenadas);
                break;
        }

    }

    $("#btnDibujar").click(function (e) {
        color = $("#inputColor").val();
        drawScene({});
    });

    canvas.onmousemove = function(e) {
        if(mouse){
            color = $("#inputColor").val();
            var canvaspos = canvas.getBoundingClientRect();
            var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
            drawScene(coord);
        }
    };

    canvas.onclick = function(e){
        color = $("#inputColor").val();
        lineWidth = $("#inputTamanio").val();
        var canvaspos = canvas.getBoundingClientRect();
        var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
        drawScene(coord);
    };

    canvas.onmousedown = function(e) {
        mouse = true;
        var canvaspos = canvas.getBoundingClientRect();
        var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
        estados = [1, 0, 0];
        drawScene(coord);
        estados = [0, 0, 0];
    };

    canvas.onmouseup = function(e) {
        mouse = false;
        var canvaspos = canvas.getBoundingClientRect();
        var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
        estados = [0, 0, 1];
        drawScene(coord);
        estados = [0, 0, 0];
    };

    drawScene({});

}

/********** Controles html *******************/

$(document).ready(function (e) {
    $("#controlesLinea").hide();
    $("#controlesRectangulo").hide();
});

function elegirShape(shape, boton) {
    $(".controles-shape").hide();
    $("#controles" + shape).show();
    shapeActual = shape.toLowerCase();
    $('.btn-shape').removeClass('btn-info');
    $(boton).addClass('btn-info');
}
