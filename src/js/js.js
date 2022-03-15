function start() { /*Comandos mudam porque está usando Jquery*/ 

$("#inicio").hide(); //Ocultar a div inicio

$("#fundoGame").append("<div id='jogador' class='anima1'></div>"); /*Para fazer o movimento no helicoptero amigo*/ 
$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");/*Para fazer o movimento no helicoptero Inimigo*/ 
$("#fundoGame").append("<div id='inimigo2'></div>");
$("#fundoGame").append("<div id='amigo' class='anima3'></div>");


//Principais variaveis do jogo

var jogo = {}
var TECLA = {
    W: 87,
    S: 83,
    D: 68
}

jogo.pressionou = {}



//Verificando se as teclas foram pressionadas

$(document).keydown(function(e){ //keydown - pressionou
    jogo.pressionou[e.which] = true;
})

$(document).keyup(function(e){ //keyup não precionou
    jogo.pressionou[e.which] = false;
})



// Game Loop

jogo.timer = setInterval(loop,30);

function loop() {
    movefundo();
    movejogador();
}  //fim do loop

// Movendo o fundo

function movefundo() {

    esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position",esquerda-1);
}

//Função para mover o jogador
function movejogador() {

    if(jogo.pressionou [TECLA.W]){
        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top",topo-10);
    }
    if(jogo.pressionou[TECLA.S]){
        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top",topo+10);
    }


   
    /*if(jogo.pressionou[TECLA.D]){
        var top1 = parseInt($("#jogador").css("left"));
        $("#jogador").css("left",top1+10);      

        //Aqui ele vai para direita >>>
    }*/

    if(jogo.pressionou[TECLA.D]){
        

        //Criar função de disparo
    }
}





} // fim do jogo 