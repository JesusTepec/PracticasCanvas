window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

function canvasSupport() {
  return Modernizr.canvas;
}

function canvasApp() {
  if (!canvasSupport()) {
    return;
  } else {
    var theCanvas = document.getElementById("canvas");
    var context = theCanvas.getContext("2d");
    var x = theCanvas.width;
    var y = theCanvas.height;
    var centro_x = x / 2;
    var centro_y = y / 2;
    var colores = [];
    var modoDegradado = "HORIZONTAL";
    var btnAgregar = document.getElementById("AgregarColor");
    var btnAleatorio = document.getElementById("btnAleatorio");
    var btnHorizontal = document.getElementById("btnHorizontal");
    var btnVertical = document.getElementById("btnVertical");
    var btnDiagonal1 = document.getElementById("btnDiagonal1");
    var btnDiagonal2 = document.getElementById("btnDiagonal2");
    var btnRadial = document.getElementById("btnRadial");
    var btnBorrar = document.getElementById("btnBorrar");
  }

  function componentToHex(valor) {
    var hex = valor.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function randIntHex(min, max) {
    return componentToHex(Math.floor((Math.random() * max) + min));
  }

  function colorAleatorio() {
    return "#" + randIntHex(0, 255) + randIntHex(0, 255) + randIntHex(0, 255) + ""
  }

  function degradadoAleatorio(){
    colores[0] = colorAleatorio();
    colores[1] = colorAleatorio();
    colores[2] = colorAleatorio();
    drawScene();
  }

  function drawScene() {
    var degradado = null;
    if(modoDegradado === "HORIZONTAL")
      degradado = context.createLinearGradient(0,0,0, y);
    else if(modoDegradado === "VERTICAL")
      degradado = context.createLinearGradient(0,0,x,0);
    else if(modoDegradado === "DIAGONAL1")
      degradado = context.createLinearGradient(0,0,x,y);
    else if(modoDegradado === "DIAGONAL2")
      degradado = context.createLinearGradient(x,0,0,y);
    else if(modoDegradado === "RADIAL")
      degradado = context.createRadialGradient(centro_x, centro_y, x / 2, centro_x, centro_y, 0);
    var cantidad = colores.length;
    var porcentaje = 1 / (cantidad - 1);

    for(i = 1; i < cantidad; i++){
      degradado.addColorStop(porcentaje * i, colores[i - 1]);
    }
    if (cantidad == 0) {
      degradado.addColorStop(1, colorAleatorio());
    }

    context.fillStyle = degradado;
    context.fillRect(0, 0, x, y);
  }

  selectorColor.onclick = function(){
    this.value = colorAleatorio();
  }

  btnAgregar.onclick = function() {
    colores.push( document.getElementById("selectorColor").value);
    drawScene();
  }

  btnAleatorio.onclick = function() {
    degradadoAleatorio();
  }

  btnHorizontal.onclick = function() {
    modoDegradado = "HORIZONTAL";
    drawScene();
  }

  btnVertical.onclick = function() {
    modoDegradado = "VERTICAL";
    drawScene();
  }

  btnDiagonal1.onclick = function() {
    modoDegradado = "DIAGONAL1";
    drawScene();
  }

  btnDiagonal2.onclick = function() {
    modoDegradado = "DIAGONAL2";
    drawScene();
  }

  btnRadial.onclick = function() {
    modoDegradado = "RADIAL";
    drawScene();
  }

  btnBorrar.onclick = function() {
    colores.length = 0;
    drawScene();
  }

  degradadoAleatorio();
}
