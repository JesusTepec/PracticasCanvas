
window.onload = function() {
    var mouse = false;
    var canvas = document.getElementById("canvas1");
    var contenedor = document.getElementById("Contenedor");
    var cuadritos = [];
    var sizeCuadro = {ancho: 25, alto: 25};
    var color = "red";
    var inputColor = document.getElementById("color");
    var inputSizeCuadros = document.getElementById("sizeCuadros");

    if (canvas && canvas.getContext) {
        var ctx = canvas.getContext("2d");
        if (ctx) {
            canvas.width = contenedor.offsetWidth - 400;

            function limparArea(x, y, ancho, alto) {
                ctx.clearRect(x, y, ancho, alto);
            }

            function dibujaGrid(disX, disY, anchoLinea, color){
                ctx.strokeStyle = color;
                ctx.lineWidth = anchoLinea;
                var columnas = [];
                var filas = [];
                for (var i = disX + anchoLinea; i < canvas.width; i += disX) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, canvas.height);
                    ctx.stroke();
                    columnas.push(i);
                }
                for (i = disY; i < canvas.height; i += disY) {
                    ctx.beginPath();
                    ctx.moveTo(0, i);
                    ctx.lineTo(ctx.canvas.width, i);
                    ctx.stroke();
                    filas.push(i);
                }
                columnas.push(0);
                filas.push(0);
                for (x = 0; x < columnas.length; x++) {
                    for (y = 0; y < filas.length; y++) {
                        cuadritos.push([columnas[x], filas[y], disX, disY]);
                    }
                }
            }

            function fillCell(x, y, color) {
                ctx.fillStyle = color;
                for (i = 0; i < cuadritos.length; i++) {
                    var cuadro = cuadritos[i];
                    if (
                        x > cuadro[0] &&
                        x < cuadro[0] + cuadro[2] &&
                        y > cuadro[1] &&
                        y < cuadro[1] + cuadro[3]
                    ) {
                        ctx.fillRect(cuadro[0], cuadro[1], sizeCuadro.ancho, sizeCuadro.alto);
                    }
                }
                dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 0.4, "Red");
            }

            canvas.onmousemove = function(e) {
                if(mouse){
                    var canvaspos = canvas.getBoundingClientRect();
                    fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top, color);
                }
            };

            canvas.onclick = function(e){
                var canvaspos = canvas.getBoundingClientRect();
                fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top, color)
            };

            canvas.onmousedown = function() {
                mouse = true;
            };

            canvas.onmouseup = function() {
                mouse = false;
            };

            inputColor.addEventListener('change', function() {
                color = this.value;
            }, false);

            inputSizeCuadros.addEventListener('change', function () {
                sizeCuadro.ancho = parseInt(this.value);
                sizeCuadro.alto = parseInt(this.value);
                limparArea(0, 0, canvas.width, canvas.height);
                cuadritos = [];
                dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "Red");
            }, false);

            dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "Red");

        } else {
            alert("No se pudo cargar el contexto");
        }
    }
};
