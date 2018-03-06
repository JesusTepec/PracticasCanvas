window.addEventListener("load", eventWindowLoaded, false);
var shapeActual = "";
var relleno = false;

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
    var mouse = false;
    var estados = [0, 0, 0];
    var xTemp = 0;
    var yTemp = 0;
    shapeActual = "pencil";

    function dibujarLinea(data) {
        if (estados[0]) {
            context.beginPath();
            context.moveTo(data.x1, data.y1);
        }
        if(estados[2]) {
            context.lineTo(data.x2, data.y2);
            context.stroke();
        }
    }

    function dibujarLineaContinua(data){
        if (estados[0]){
            context.beginPath();
            context.moveTo(data.x, data.y);
        }
        if(estados[1]){
            context.lineTo(data.x, data.y);
            context.stroke();
        }
        if(estados[2]){
            context.lineTo(data.x, data.y);
            context.stroke();
        }
    }

    function dibujarRectangulo(data) {
        if(data.length !== 0) {
            if(relleno)
                context.fillRect(data.x, data.y, data.w, data.h);
            context.strokeRect(data.x, data.y, data.w, data.h);
        }
    }

    function dibujarCirculo(data){
        if(data.length !== 0) {
            context.beginPath();
            context.arc(data.x, data.y, data.r, 0, 2 * Math.PI);
            context.closePath();
            if(relleno)
                context.fill();
            context.stroke()
        }
    }

    function dibujarElipse(data){
        if(data.length !== 0) {
            context.beginPath();
            context.ellipse(data.x, data.y, data.w, data.h, 0, 0, 2 * Math.PI);
            context.closePath();
            if(relleno)
                context.fill();
            context.stroke()
        }
    }

    function borrador(coordenada) {
        var size = $("#inputTamanio").val();
        var w = 5 + size;
        var h = 5 + size;
        context.clearRect(coordenada.x - 10, coordenada.y - 10, w, h);
    }

    function lineaEstados(coordenadas, input) {
        var data = {};
        if(input === true){
            data = {x1: $("#coordX").val(), y1: $("#coordY").val(), x2: $("#coordXx").val(), y2: $("#coordYy").val()};
            estados = [1, 1, 1];
        }else {
            if (estados[0]) {
                data = {x1: coordenadas.x, x2: 0, y1: coordenadas.y, y2: 0};
                $("#coordX").val(coordenadas.x);
                $("#coordY").val(coordenadas.y);
            }
            if (estados[2]) {
                data = {x1: 0, x2: coordenadas.x, y1: 0, y2: coordenadas.y};
            }
            $("#coordXx").val(coordenadas.x);
            $("#coordYy").val(coordenadas.y);
        }
        dibujarLinea(data);

    }

    function rectanguloEstados(coordenadas, input){
        var data = {};
        if(input) {
            data = {x: $("#rectX").val(), y: $("#rectY").val(), w: $("#rectW").val(), h: $("#rectH").val()};
        }else {
            if (estados[0]) {
                xTemp = coordenadas.x;
                yTemp = coordenadas.y;
                $("#rectX").val(coordenadas.x);
                $("#rectY").val(coordenadas.y);
            }
            if (estados[2]) {
                data = {x: xTemp, y: yTemp, w: coordenadas.x - xTemp, h: coordenadas.y - yTemp};
            }
            $("#rectW").val(coordenadas.x - xTemp);
            $("#rectH").val(coordenadas.y - yTemp);
        }
        dibujarRectangulo(data);
    }

    function circuloEstados(coordenadas, input){
        var data = {};
        if(input) {
            data = {x: $("#circleX").val(), y: $("#circleY").val(), r: $("#circleRadio").val()};
            dibujarCirculo(data)
        }else {
            if (estados[0]) {
                xTemp = coordenadas.x;
                yTemp = coordenadas.y;
                $("#circleX").val(coordenadas.x);
                $("#circleY").val(coordenadas.y);
            }
            if (estados[2]) {
                var w = (coordenadas.x - xTemp) / 2;
                var h = (coordenadas.y - yTemp) / 2;
                //    var c = Math.sqrt(Math.pow(w,2) - Math.pow(h,2));
                data = {x: xTemp + w, y: yTemp + h, w: Math.abs(w), h: Math.abs(h)};
                dibujarElipse(data);
            }
        }
    }

    function drawScene(coordenadas, input){
        context.lineWidth = $("#inputTamanio").val();
        context.strokeStyle = $("#inputColor").val();
        context.fillStyle = $("#inputColorFondo").val();
        switch (shapeActual){
            case "linea":
                lineaEstados(coordenadas, input);
                break;
            case "pencil":
                dibujarLineaContinua(coordenadas);
                break;
            case "rectangulo":
                rectanguloEstados(coordenadas, input);
                break;
            case "circulo":
                circuloEstados(coordenadas, input);
                break;
            case "borrador":
                borrador(coordenadas);
                break;
        }
        estados = [0, 0, 0];
    }

    $("#btnDibujar").click(function (e) {
        drawScene({}, true);
    });

    canvas.onmousemove = function(e) {
        if(mouse){
            var canvaspos = canvas.getBoundingClientRect();
            var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
            estados = [0, 1, 0];
            drawScene(coord, false);
        }
    };

    canvas.onclick = function(e){
        var canvaspos = canvas.getBoundingClientRect();
        var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
        drawScene(coord, false);
    };

    canvas.onmousedown = function(e) {
        mouse = true;
        var canvaspos = canvas.getBoundingClientRect();
        var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
        estados = [1, 0, 0];
        drawScene(coord, false);
    };

    canvas.onmouseup = function(e) {
        mouse = false;
        var canvaspos = canvas.getBoundingClientRect();
        var coord = {x: e.clientX - canvaspos.left, y: e.clientY - canvaspos.top};
        estados = [0, 0, 1];
        drawScene(coord, false);
    };

    drawScene({}, false);

}

/********** Controles html *******************/

$(document).ready(function (e) {
    $("#controlesLinea").hide();
    $("#controlesRectangulo").hide();
    $("#controlesCirculo").hide();
    $("#controlesPencil").hide();
});

function elegirShape(shape, boton) {
    $(".controles-shape").hide();
    if(shape === "Borrador")
        $("#controlesBorrador").show();
    else
        $("#controles" + shape).show();
    shapeActual = shape.toLowerCase();
    $('.btn-shape').removeClass('btn-info');
    $(boton).addClass('btn-info');
}

function elegirRelleno(boton){
    if(!relleno){
        $(boton).addClass('btn-info');
        relleno = true;
    }else{
        $(boton).removeClass('btn-info');
        relleno = false;
    }
}
