function start() { /*Comandos mudam porque está usando Jquery*/ 

$("#inicio").hide(); //Ocultar a div inicio

$("#fundoGame").append("<div id='jogador' class='anima1'></div>"); /*Para fazer o movimento no helicoptero amigo*/ 
$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");/*Para fazer o movimento no helicoptero Inimigo*/ 
$("#fundoGame").append("<div id='inimigo2'></div>");
$("#fundoGame").append("<div id='amigo' class='anima3'></div>");


//Principais variaveis do jogo

var jogo = {}

// Game Loop

jogo.timer = setInterval(loop,30);

function loop() {
    movefundo();
}  //fim do loop

// Movendo o fundo

function movefundo() {

    esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position",esquerda-1);
}





} // fim do jogo 