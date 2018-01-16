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
	}else{
		var canvas = document.getElementById("canvasOne");
		var context = canvas.getContext("2d");
		var x = 10;
		var y = 10;
	}

  function drawCircle(x, y, radio) {
    context.beginPath();
    context.arc(x, y, radio, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  function rand_range(min, max){
    return Math.floor((Math.random() * max) + min);
  }

	function drawScene(){
    var gradiente = context.createLinearGradient(0, 0, canvas.width, 0);
    gradiente.addColorStop(0, 'rgb(82, 178, 47)');
    gradiente.addColorStop(0.5, 'rgb(73, 232, 83)');
    gradiente.addColorStop(1, 'rgb(136, 255, 93)');
    var gradienteStroke = context.createLinearGradient(50, 0, canvas.width - 50, 0);
    gradienteStroke.addColorStop(0, '#FF761F');
    gradienteStroke.addColorStop(0.5, 'rgb(73, 232, 83)');
    gradienteStroke.addColorStop(1, '#FF402C');
    var radialGradiante = context.createRadialGradient(canvas.width / 2, canvas.height /2, 70, canvas.width / 2, canvas.height /2, 320);
    radialGradiante.addColorStop(0, '#E8CD1C');
    radialGradiante.addColorStop(.4, '#FF402C');
    radialGradiante.addColorStop(.8, '#FF761F');
    radialGradiante.addColorStop(1, '#FFCE2C');
    context.fillStyle = gradiente;
    context.strokeStyle = gradienteStroke;
  //  context.fillRect(0, 0, canvas.width, canvas.height);
  //  context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    context.fillStyle = radialGradiante;
    for (var i = 0; i < 5000; i++){
      var x = rand_range(4, canvas.width - 10);
      var y = rand_range(4, canvas.height - 10);
      var r = rand_range(4, 6);
      drawCircle(x, y, r);
    }
    //drawCircle(320, 240, 400);
	}

  function dibujaBolita(){
    var x = rand_range(4, canvas.width - 4);
    var y = rand_range(4, canvas.height - 4);
    var r = rand_range(2, 5);
    drawCircle(x, y, r);
  }

	drawScene();

  setInterval(dibujaBolita, 1000 / 160);
}
