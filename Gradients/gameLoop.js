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

  var yOffset = 0;

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
    context.clearRect(0, 0, canvas.width, canvas.height);

    var currentPath = context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = 20;
    context.moveTo(0, 0 + yOffset);
    context.lineTo(50, 0 + yOffset);
    context.lineTo(50, 50 + yOffset);
    context.stroke();
    context.closePath();
    var isPoint1InPath1=context.isPointInPath(0, 0);
    var isPoint1InPath2=context.isPointInPath(10, 10);
    console.log("isPoint1InPath1=" + isPoint1InPath1);
    console.log("isPoint1InPath2=" + isPoint1InPath2);
    yOffset += 1;
	}

  function gameLoop() {
      window.setTimeout(gameLoop, 20);
      drawScene();
  }
	//drawScene();
  gameLoop();
}
