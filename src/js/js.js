function start() { /*Comandos mudam porque está usando Jquery*/ 

$("#inicio").hide(); //Ocultar a div inicio

$("#fundoGame").append("<div id='jogador' class='anima1'></div>"); /*Para fazer o movimento no helicoptero amigo*/ 
$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
$("#fundoGame").append("<div id='inimigo2'></div>");
$("#fundoGame").append("<div id='amigo'></div>");
}