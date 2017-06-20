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
		context.fillStyle = "#5588FF";
		context.fillRect(0, 0, 640, 480);
		context.strokeStyle = "#AABBBB";
		context.lineWidth = 40;
		context.beginPath();
		context.moveTo(0, 460);
		context.lineTo(640, 460);
		context.stroke();
		context.closePath();
		context.strokeStyle = "#00FF22";
		context.lineCap = "round";
		context.save();
		context.lineWidth = 3;
		drawColumn([100, 350], 90);
		context.restore();
		context.beginPath();
		context.moveTo(100, 350);
		context.lineTo(160, 350);
		context.stroke();
		context.closePath();
		context.save();
		context.lineWidth = 3;
		drawColumn([400, 300], 140);
		context.restore();
		context.beginPath();
		context.moveTo(400, 300);
		context.lineTo(460, 300);
		context.stroke();
		context.closePath();
		context.lineWidth = 3;
		context.strokeStyle = "#FFAA22";
		drawPath([50, 50], [[60, 50], [60, 40], [40, 40], [40, 60], [70, 60], [70, 30], [30, 30], [30, 70], [70, 70]]);
		drawPath([320, 120], [[310, 120], [310, 110], [330, 110], [330, 130], [300, 130], [300, 100], [340, 100], [340, 140], [300, 140]]);
	}

	function drawColumn(inicio, cantidad){
		for(i = 0; i < cantidad; i += 3){
			if(i % 2 == 0){
				context.strokeStyle = "#FFFF22";
			}else{
				context.strokeStyle = "#00FF00";
			}
			context.beginPath();
			context.moveTo(inicio[0], inicio[1] + i);
			context.lineTo(inicio[0] + 60, inicio[1] + i);
			context.stroke();
			context.closePath();
		}
	}

	function drawPath(inicio, listaPuntos){
		context.beginPath();
		context.moveTo(inicio[0], inicio[1]);
		for(indexP in listaPuntos){
			context.lineTo(listaPuntos[indexP][0], listaPuntos[indexP][1]);
		}
		context.stroke();
		context.closePath();
	}

	drawScene();

}
