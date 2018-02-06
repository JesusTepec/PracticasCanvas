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
	var theCanvas = document.getElementById("canvas");
	var context = theCanvas.getContext("2d");

  var spaceShip = new Image();
  spaceShip.addEventListener('load', eventSheetLoaded, false);
  spaceShip.src = "img/sheet.png";
  function eventSheetLoaded() {
    drawScene();
  }

	function drawScene(){
    //placeShip(spaceShip, 0, 0, 30, 30);
    //placeShip(spaceShip, 50, 50);

    context.drawImage(spaceShip, 222, 0, 102, 76, 50, 0, 74, 64)
	}

  function placeShip(obj, posX, posY, width, height){
    if(width && height){
      context.drawImage(obj, posX, posY, width, height);
    }else{
      context.drawImage(obj, posX, posY);
    }
  }

	//drawScene();

}
