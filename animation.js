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
	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

	function drawScene(){
		context.globalAlpha = 1;
		context.fillstye = "#000000";
		context.fillRect(0, 0, 640, 480);
		context.globalAlpha = .55;
		context.drawImage(helloWorldImage, 0, 0, 640, 480);
		if(fadeIn == true){
			alpha += .01;
			if(alpha >= 1){
				alpha = 1;
				fadeIn = false
			}
		} else {
			alpha -= .01;
			if(alpha < 0 ){
				alpha = 0;
				fadeIn = true;
			}
		}
		context.globalAlpha = alpha;
		context.font = "72px sans-serif";
		context.textBaseline = "top";
		context.fillStyle = "#FFFFFF";
		context.fillText(text, 150, 200);
	}

	var alpha = 0;
	var fadeIn = true;
	var text = "Hello World";
	var helloWorldImage = new Image();
	//<a href='http://www.freepik.es/vector-gratis/fondo-morado-de-triangulos-de-colores_1095549.htm'>Designed by Freepik</a>
	helloWorldImage.src = "111193.jpg";

	function gameLoop(){
		window.setTimeout(gameLoop, 20);
		drawScene();
	}

	gameLoop();
}