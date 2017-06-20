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
	}

	function drawScene(){
		var gdr = context.createLinearGradient(0, 0, theCanvas.width, 0);	

		gdr.addColorStop(0, 'rgb(255, 0, 0)');     

		gdr.addColorStop(0.5, 'rgb(0, 255, 0)');
		gdr.addColorStop(1, 'rgb(255, 0, 0)');

		context.fillStyle = gdr;
		context.fillRect(0, 0, theCanvas.width, theCanvas.height);
	}
	drawScene();
}
