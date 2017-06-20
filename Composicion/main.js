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

	function rotar(grados, x, y, width, height){
		var angleInRadians = grados * Math.PI / 180;
		context.translate(x + (width / 2), y + .5 * height);
		context.rotate(angleInRadians);
		x = - .5 * width;
		y = - .5 * height;
		return [x, y];
	}

	function drawScene(grados){
		/*context.clearRect(0,0, 640, 480);
		context.fillStyle = "black";
		context.fillRect(100, 20 ,2,300);
		context.fillStyle = "red";
		coord = rotar(grados, 50, 100, 100,100);
		context.fillRect(coord[0], coord[1] , 100, 100);
		context.setTransform(1,0,0,1,0,0);
		coord = rotar(grados, 85, 250, 30,30);
		context.fillRect(coord[0], coord[1] , 30, 30);
		context.setTransform(1,0,0,1,0,0);*/

context.strokeStyle = "red";
context.fillStyle = "red";
context.lineWidth = 6;
context.beginPath();
context.moveTo(50, 50);
context.lineTo(300, 50);
context.lineTo(300, 200)
context.closePath();
context.fill();
	}
	drawScene(0);
  /*  var i = 0;
	setInterval(function(){
		drawScene(i);
		i += 1;
	},50);*/
}
