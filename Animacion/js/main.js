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

  var mensaje = "Hola mors";
  var sub_mensaje = "Tu sonrisa es la energía de todos los días";

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  function radians(grados){
    return grados * Math.PI / 180;
  }

  function drawCircle(x, y, radio) {
    context.beginPath();
    context.arc(x, y, radio, 0, radians(360));
    context.fill();
    context.closePath();
  }

  function drawFigura(){
    drawCircle(460, 140, 40);
    for(var i = 0; i < 360; i += 60){
      var x = 40 * Math.cos(Math.PI / 180 * i) + 460;
      var y = 40 * Math.sin(Math.PI / 180 * i) + 140;
      drawCircle(x, y, 20);
    }
    context.save();
    context.fillStyle = "#040012";
    drawCircle(460, 140, 20);
    context.restore();
  }

	function drawScene(){

    context.fillStyle = "#040012";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = "90px Pacifico";
    context.textAlign = "center";
    context.textBaseline = "middle";

    var metrics = context.measureText(mensaje);
    var xPosition = (canvas.width / 2);
    var yPosition = (canvas.height / 2);

    var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < colorStops.length; i++) {
      var tempColorStop = colorStops[i];
      var tempColor = tempColorStop.color;
      var tempStopPercent = tempColorStop.StopPercent;
      gradient.addColorStop(tempStopPercent, tempColor);
      tempStopPercent += .015;
      if(tempStopPercent > 1){
        tempStopPercent = 0;
      }
      tempColorStop.StopPercent = tempStopPercent;
      colorStops[i] = tempColorStop;
    }

    context.fillStyle = gradient;
    context.fillText(mensaje, xPosition, yPosition);
    context.textBaseline = "top";
    context.font = "30px pristina";
    context.fillText(sub_mensaje.substring(0, Math.trunc(progreso)), xPosition, yPosition + 50);
    progreso = (progreso >= sub_mensaje.length) ? sub_mensaje.length : progreso += .2;
    drawFigura();
  }

  function gameLoop(){
    window.setTimeout(gameLoop, 30);
    drawScene();
  }

  var progreso = 1;

  var colorStops = new Array(
    {color: "#FF0000", StopPercent: 0},
    {color: "#FFFF00", StopPercent: .125},
    {color: "#00FF00", StopPercent: .375},
    {color: "#0000FF", StopPercent: .625},
    {color: "#FF00FF", StopPercent: .875},
    {color: "#FF0000", StopPercent: 1}
  );

  gameLoop();

}
