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
		var scale = 0.0;
		var angle = 0;
		var centro = [];
		var colores = ['red', 'blue', 'purple', 'yellow', 'green', 'orange', 'pink', 'brown', '#FF00FF', '#66AA33', 'red', 'blue', 'purple', 'yellow', 'green', 'orange', 'pink', 'brown', '#FF00FF', '#66AA33', 'red', 'blue', 'purple', 'yellow', 'green', 'orange', 'pink', 'brown', '#FF00FF', '#66AA33']
		for (i = 0; i < 30; i++){
			centro[i] = [Math.floor((Math.random() * 600) + 10), Math.floor((Math.random() * 450) + 10)] ;
		}		
	}

	function drawScene(coord, width, height, color){
		context.setTransform(1,0,0,1,0,0);
		var angleInRadians = angle * Math.PI / 180;
		var x = coord[0];
		var y = coord[1];
		context.translate(x+.5*width, y+.5*height);
		context.scale(scale, scale);
		context.rotate(angleInRadians);
		context.fillStyle = color;
		context.fillRect(-.5*width, -.5*height, width, height);
	}

	function limpiarContexto(){
		context.setTransform(1,0,0,1,0,0);
		context.clearRect(0, 0, theCanvas.width, theCanvas.height);
	}

	setInterval(function(){
		for(var i = 0; i < 30; i++){
			drawScene(centro[i], 10, 10, colores[i]);
		}
		if(scale < 4)
			scale += 0.05;
		else {
			scale = 0.0;
			for (i = 0; i < 30; i++){
				centro[i] = [Math.floor((Math.random() * 600) + 10), Math.floor((Math.random() * 450) + 10)] ;
			}	
    		limpiarContexto();
		}
		angle += 4;

	}, 100);
	//drawScene();
}
