var canvas = document.getElementById("miCanvas");
var contexto = canvas.getContext("2d");

function radians(grados){
  return grados * Math.PI / 180;
}

function rand_range(min, max){
  return Math.floor((Math.random() * max) + min);
}

function color(){
  var r = rand_range(0, 255);
  var g = rand_range(0, 255);
  var b = rand_range(0, 255);
  return "rgb("+r+","+g+","+b+")";
}

var cantidad =document.getElementById("myRange").value;
var y = 160;
var radio = 100;
var x = 160;

contexto.fillStyle = "#E8A41C";
contexto.strokeStyle = "#FFF81F";
contexto.lineWidth = 2;

contexto.beginPath();
contexto.arc(x, y, radio, 0, radians(360));
contexto.fill();
contexto.closePath();

function generaPartes(){
  for( i = 0; i < cantidad; i++){
    contexto.fillStyle = color();
    contexto.beginPath();
    contexto.moveTo(x, y);
    var fraccion = 360 / cantidad;
    var grados = fraccion * i;
    contexto.arc(x, y, radio, radians(grados), radians(grados + fraccion));
    contexto.fill();
    contexto.stroke();
    contexto.closePath();
  }
}
generaPartes();

$("#myRange").change(function(){
  cantidad = document.getElementById("myRange").value;
  $("#cantidad").html(cantidad);
  generaPartes()
});
