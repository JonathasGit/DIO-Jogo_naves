function start() { /*Comandos mudam porque está usando Jquery*/

    $("#inicio").hide(); //Ocultar a div inicio

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>"); /*Para fazer o movimento no helicoptero amigo*/
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");/*Para fazer o movimento no helicoptero Inimigo*/
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");


    //Principais variaveis do jogo
   var podeAtirar = true; 
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
        moveinimigo2();
        moveamigo();
        colisao();
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

            disparo();             
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

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));   //Cria variavel  
        $("#inimigo2").css("left", posicaoX-3); // pega a div e vai subtraindo por 3

        if (posicaoX<=0) {           
            $("#inimigo2").css("left", 775);
        }
    }

    function moveamigo(){
        posicaoX = parseInt($("#amigo").css("left"));   //Cria variavel  na condiçaõ x 
        $("#amigo").css("left", posicaoX+1);

        if (posicaoX>906) {          // Qunado tiver em 906 volta ao zero   
            $("#amigo").css("left", 0);
        }
    }

    function disparo() {

        if(podeAtirar==true){ // se igual a true pode realizar o tiro 
            podeAtirar=false; //  não posso realizar outro tiro, enquanto não terminar a função a baixo

            //Identificando o jogador (helicptero)
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))         

            //posicionando o disparo
            tiroX = posicaoX + 190;
            topoTiro = topo + 40;
            //Fim da posição 

            //Criando a div disparo
            $("#fundoGame").append("<div id='disparo'></div>");//Criando a div
            //Posicionando a div
            $("#disparo").css("top",topoTiro);  
            $("#disparo").css("left",tiroX);


            //Fazer o disparo caminhar
            var tempoDisparo=window.setInterval(executaDisparo, 30);            
        }

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left")); //posição inicial do disparo
            $("#disparo").css("left",posicaoX+15); //caminhar 15 

            if(posicaoX>900){ // REmovendo a div do disparo
                window.clearInterval(tempoDisparo);
                tempoDisparo=null;
                $("#disparo").remove();
                podeAtirar=true;
            }

        }

    }

    function colisao(){
        var colisao1 = ($("#jogador").collision($("#inimigo1"))); // colisão do jogador com inimigo1

        console.log(colisao1);

    }





} // fim do jogo 