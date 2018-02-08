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
    spaceShip.src = "img/sheetTanks.png";

    var animationsFrames = [1, 2, 3, 4, 5, 6, 7, 8];
    var frameIndex = 0;
    var dx = 0;
    var dy = -2;
    var x = 50;
    var y = 400;

    function eventSheetLoaded() {
        startUp();
    }

    function drawScene(){
        y = y + dy;
        x = x + dx;
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 500, 500);

        var sourceX = Math.floor(animationsFrames[frameIndex] % 8) * 32;
        var sourceY = Math.floor(animationsFrames[frameIndex] / 8) * 32;

        context.drawImage(spaceShip, sourceX, sourceY, 32, 32, x, y, 32, 32);
        frameIndex++;
        if(frameIndex == animationsFrames.length) {
            frameIndex = 0;
        }
    }

    function placeShip(obj, posX, posY, width, height){
        if(width && height){
            context.drawImage(obj, posX, posY, width, height);
        }else{
            context.drawImage(obj, posX, posY);
        }
    }

    function startUp() {
        gameLoop();
    }

    function gameLoop() {
        window.setTimeout(gameLoop, 100);
        drawScene();
    }

    //drawScene();

}
