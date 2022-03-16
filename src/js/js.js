function start() { /*Comandos mudam porque está usando Jquery*/

    $("#inicio").hide(); //Ocultar a div inicio

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>"); /*Para fazer o movimento no helicoptero amigo*/
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");/*Para fazer o movimento no helicoptero Inimigo*/
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");


    //Principais variaveis do jogo
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var jogo = {}
    var TECLA = {
        W: 87,
        S: 83,
        D: 68,
        A: 65
    }

    jogo.pressionou = {}



    //Verificando se as teclas foram pressionadas

    $(document).keydown(function (e) { //keydown - pressionou
        jogo.pressionou[e.which] = true;
    })

    $(document).keyup(function (e) { //keyup não precionou
        jogo.pressionou[e.which] = false;
    })



    // Game Loop

    jogo.timer = setInterval(loop, 30);

    function loop() {
        movefundo();
        movejogador();
        moveinimigo1();
    }  //fim do loop

    // Movendo o fundo

    function movefundo() {

        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);
    }

    //Função para mover o jogador
    function movejogador() {

        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            //Limitando o jogador de se mover para cima
            if (topo <= 0) {
                $("#jogador").css("top", topo + 10);
            }
            //fim da limitação


        }
        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);


            //Limitando o jogador de se mover para baixo
            if (topo >= 434) {
                $("#jogador").css("top", topo - 10);
            }
            //fim da limitação
        }



        /*if(jogo.pressionou[TECLA.D]){ 
           // Movimenta para frente
            var top1 = parseInt($("#jogador").css("left"));
            $("#jogador").css("left",top1+10);   
    
              if(jogo.pressionou[TECLA.D]){
            var esquerda1 = parseInt($("#jogador").css("left"));
            $("#jogador").css("left",esquerda1+10); 
       
    
            //Aqui ele vai para direita >>>
        }*/

        if (jogo.pressionou[TECLA.D]) {





            //Criar função de disparo
        }
          //Movimenta para trás 
           /*if(jogo.pressionou[TECLA.A]){
               var esquerda1 = parseInt($("#jogador").css("left"));
               $("#jogador").css("left",esquerda1-10); 
       
           }*/
    } // Fim do move jogador



    //MOvimentando o inimigo 1 
    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX - velocidade); //subtrai a posição do inimigo em 5 
        $("#inimigo1").css("top", posicaoY); // posicionando em top, na posição random

        if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    }





} // fim do jogo 