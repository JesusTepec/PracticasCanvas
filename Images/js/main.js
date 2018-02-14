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
    var rotatation = 90;
    var dx = 1;
    var dy = 0;
    var x = 50;
    var y = 400;

    function eventSheetLoaded() {
        startUp();
    }

    function drawScene(){
        y = y + dy;
        x = x + dx;
        context.fillStyle = "#ffc66d";
        context.fillRect(0, 0, 500, 500);

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(x + 16, y + 16);
        var angleInRadians = rotatation * Math.PI / 180;
        context.rotate(angleInRadians);

        var sourceX = Math.floor(animationsFrames[frameIndex] % 8) * 32;
        var sourceY = Math.floor(animationsFrames[frameIndex] / 8) * 32;

        context.drawImage(spaceShip, sourceX, sourceY, 32, 32,  - 16,  - 16, 32, 32);
        context.restore();
        frameIndex++;
        if(frameIndex === animationsFrames.length) {
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
