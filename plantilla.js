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
		var theCanvas = document.getElementById("canvasOne");
		var context = theCanvas.getContext("2d");
		var x = 10;
		var y = 10;
	}

	function drawScene(){
		context.strokeStyle = "red";
		context.beginPath();
		context.moveTo(0, 0);
		context.quadraticCurveTo(x, y, 0, 100);
		context.stroke();
		context.closePath();

		context.strokeStyle = "blue";
		context.beginPath();
		context.moveTo(630, 240);
		context.quadraticCurveTo(x, y, 630, 300);
		context.stroke();
		context.closePath();

		context.strokeStyle = "green";
		context.beginPath();
		context.moveTo(0, 400);
		context.quadraticCurveTo(x, y, 0, 470);
		context.stroke();
		context.closePath();
	}

	theCanvas.addEventListener('mousemove', function(evt) {
		var rect = theCanvas.getBoundingClientRect();
		x = evt.clientX - rect.left;
		y = evt.clientY - rect.top;
		drawScene();
	}, false);
	drawScene();
}
