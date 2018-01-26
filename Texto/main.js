window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

function canvasSupport() {
  return Modernizr.canvas;
}

function canvasApp(){
  var mensaje = "Hola";
  var styleText = "fill";
  var fuente = "Pacifico";
  var fontSize = '50';
  var colorStroke = "#4E0D12";
  var colorFill = "#4E0D12";
  var borderWeight = 1;

	if (!canvasSupport()) {
	    return;
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

  var formInputs = document.getElementById("textoEntrada");
  formInputs.addEventListener('keyup', textBoxChanged, false);

  formInputs = document.getElementById("styleText");
  formInputs.addEventListener('change', styleTextChanged, false);

  formInputs = document.getElementById("fuente");
  formInputs.addEventListener('change', fuenteChanged, false);

  formInputs = document.getElementById("fontSize");
  formInputs.addEventListener('change', fontSizeChanged, false);

  formInputs = document.getElementById("colorStroke");
  formInputs.addEventListener('change', colorStrokeChanged, false);

  formInputs = document.getElementById("colorFill");
  formInputs.addEventListener('change', colorFillChanged, false);

  formInputs = document.getElementById("borderSize");
  formInputs.addEventListener('change', borderSizeChanged, false);

	function drawScene(){
    var metrics = context.measureText(mensaje);
    var textWidth = metrics.width;
    var xPosition = (canvas.width / 2) - (textWidth / 2);
    var yPosition = (canvas.height / 2);

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = fontSize + "px " + fuente;
    context.fillStyle = colorFill;
    context.strokeStyle = colorStroke;
    context.lineWidth = borderWeight;
    switch (styleText) {
      case "fill":
        context.fillText(mensaje, xPosition, yPosition);
        break;
      case "stroke":
        context.strokeText(mensaje, xPosition, yPosition);
        break;
      case "both":
        context.fillText(mensaje, xPosition, yPosition);
        context.strokeText(mensaje, xPosition, yPosition);
        break;
    }
	}

  function textBoxChanged(e){
    var target = e.target;
    mensaje = target.value;
    drawScene();
  }

  function fuenteChanged(e){
    var target = e.target;
    fuente = target.value;
    drawScene();
  }

  function styleTextChanged(e){
    var target = e.target;
    styleText = target.value;
    drawScene();
  }

  function fontSizeChanged(e){
    var target = e.target;
    fontSize = target.value;
    drawScene();
  }

  function colorStrokeChanged(e){
    var target = e.target;
    colorStroke = target.value;
    drawScene();
  }

  function colorFillChanged(e){
    var target = e.target;
    colorFill = target.value;
    drawScene();
  }

  function borderSizeChanged(e){
    var target = e.target;
    borderWeight = target.value;
    drawScene();
  }

	drawScene();

}
