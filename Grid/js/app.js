var color = "red";

function cambiarColor() {
  color = document.getElementById("color").value;
}

window.onload = function() {
  var mouse = false;
  var canvas = document.getElementById("canvas1");
  var contenedor = document.getElementById("Contenedor");
  var cuadritos = [];

  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    if (ctx) {
      canvas.width = contenedor.offsetWidth - 400;


      function dibujaGrid(disX, disY, ancho, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.2;
        var columnas = [];
        for (var i = disX + ancho; i < canvas.width; i += disX) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
          columnas.push(i);
        }

        var filas = [];
        for (var i = disY + ancho; i < canvas.height; i += disY) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(ctx.canvas.width, i);
          ctx.stroke();
          filas.push(i);
        }

        columnas.push(0);
        filas.push(0);
        for (x = 0; x < columnas.length; x++) {
          for (y = 0; y < columnas.length; y++) {
            cuadritos.push([columnas[x], columnas[y], 15, 15]);
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
            ctx.fillRect(cuadro[0], cuadro[1], 15, 15);
          }
        }
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
      }

      canvas.onmousedown = function(e) {
        mouse = true;
      };

      canvas.onmouseup = function(e) {
        mouse = false;
      };

      dibujaGrid(15, 15, 0, color);

    } else {
      alert("No se pudo cargar el contexto");
    }
  }
};
