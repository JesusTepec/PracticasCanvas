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
	}

  function radianes(grados) {
    return grados * Math.PI / 180;
  }

	function drawScene(){
  function radianes(grados) {
    return grados * Math.PI / 180;
  }

  context.fillStyle = "#C7E500";
  context.strokeStyle = "#6E7F00";
  context.lineWidth = 4;

  context.setTransform(1, 0, 0, 1, 400, 400);
  context.rotate(radianes(180));

  context.fillRect(200, 30, 200, 200);
  context.strokeRect(200, 30, 200, 200);

	}

	drawScene();
}
