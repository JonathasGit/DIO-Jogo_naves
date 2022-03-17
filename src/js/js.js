function start() { /*Comandos mudam porque está usando Jquery*/

    $("#inicio").hide(); //Ocultar a div inicio

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>"); /*Para fazer o movimento no helicoptero amigo*/
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");/*Para fazer o movimento no helicoptero Inimigo*/
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>"); //Placar do jogo
    $("#fundoGame").append("<div id='energia'></div>"); // energia do jogador


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
    var fimdejogo = false;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual=3;
    
    
  

    jogo.pressionou = {}

    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");

    //Música em loop
musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play();

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
        placar();
        energia();
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

        somDisparo.play();

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
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        if (colisao1.length>0){ //identificando se a var é  maior que zero 

            //posição da explosao       
            energiaAtual--;  // Quando houve colisão, diminuir uma vida
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y);




            // Caso haja colisão, colocar o inimigo1 no lugar dele
            posicaoY = parseInt(Math.random() * 334); // reposicionar inimigo
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);

        


            //disparar no inimigo 2 
            if (colisao4.length>0) {

                pontos=pontos+50;
		
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                $("#inimigo2").remove();
            
                explosao2(inimigo2X,inimigo2Y);
                $("#disparo").css("left",950);
                
                reposicionaInimigo2();
                    
                }    //disparar no inimigo 2 final
        }

        // jogador com o inimigo2 
        if (colisao2.length > 0) {

            energiaAtual--; // Quando houve colisão, diminuir uma vida

        

            inimigo2X = parseInt($("#inimigo2").css("left")); // pega posição
            inimigo2Y = parseInt($("#inimigo2").css("top"));// pega posição
            explosao2(inimigo2X, inimigo2Y); // executa a função explosao2

            $("#inimigo2").remove();

            reposicionaInimigo2(); // chamando a função para reposicionar inimigo2

        }
    }


    function explosao1(inimigo1X,inimigo1Y) {

        somExplosao.play();


        $("#fundoGame").append("<div id='explosao1'></div"); // criando a div 
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");  //tern a imagem 
        var div=$("#explosao1");
        div.css("top", inimigo1Y); // onde vai surgir a explosão 
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow"); // até 200 a div vai crescer
        
        var tempoExplosao=window.setInterval(removeExplosao, 1000); // para remover a explosão 
        
            function removeExplosao() {
                
                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao=null;
                
            }
            
        }  // Fim da primeira explosão

        function reposicionaInimigo2() {
	
            var tempoColisao4=window.setInterval(reposiciona4, 5000); // depois de 5 segundos
                
                function reposiciona4() {
                window.clearInterval(tempoColisao4);
                tempoColisao4=null; // zerar var
                    
                    if (fimdejogo==false) { // se acabar o jogo
                    
                    $("#fundoGame").append("<div id=inimigo2></div"); // recriar a div se o jogo for false
                    
                    }
                    
                }	
            }	         


    //Disparo com inimigo1            
    if (colisao3.length > 0) {

        velocidade=velocidade+0.3; // aumenta a velocidade do jogo


        pontos = pontos + 100;


        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));



        explosao1(inimigo1X, inimigo1Y);
        $("#disparo").css("left", 950);// colocar maior para remover

        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left", 694);
        $("#inimigo1").css("top", posicaoY);
    }
                    //fim disparo inimigo 1


                    // Disparo com o inimigo2

	                    if (colisao4.length>0) {
                            
                            
                            inimigo2X = parseInt($("#inimigo2").css("left"));
                            inimigo2Y = parseInt($("#inimigo2").css("top"));
                            $("#inimigo2").remove();

                            explosao2(inimigo2X, inimigo2Y);
                            $("#disparo").css("left", 950);


                            reposicionaInimigo2();
                       } // fim disparo com inimigo2

    // jogador com o amigo

    if (colisao5.length > 0) {



        somResgate.play();

        salvos++;
        reposicionaAmigo();
        $("#amigo").remove();

    }
    
    //Inimigo2 com o amigo

    if (colisao6.length > 0) {
      

        perdidos++;
        amigoX = parseInt($("#amigo").css("left"));
        amigoY = parseInt($("#amigo").css("top"));
        explosao3(amigoX, amigoY);
        $("#amigo").remove();

        reposicionaAmigo();

    }



        



     //Iniciando explosão 2

    function explosao2(inimigo2X, inimigo2Y) {

        somExplosao.play();

        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {

            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;

        }


    } // fim explosao 2 



    //Reposiciona o cara do solo
	
	function reposicionaAmigo() {
	
        var tempoAmigo=window.setInterval(reposiciona6, 6000);
        
            function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
            
            $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            
            }
            
        }

    } // Fim da função reposicionaAmigo()

    function explosao3(amigoX, amigoY) {


        somPerdido.play();


        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

        
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;

        }

    }

    function placar() {
	
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
        
    }

    //Barra de energia

function energia() {
	
    if (energiaAtual==3) { // se energia for igual a 3 mostrar a img 3 
        
        $("#energia").css("background-image", "url(imgs/energia3.png)");
    }

    if (energiaAtual==2) {// se energia for igual a 2 mostrar a img 2 
        
        $("#energia").css("background-image", "url(imgs/energia2.png)");
    }

    if (energiaAtual==1) {// se energia for igual a 2 mostrar a img 2
        
        $("#energia").css("background-image", "url(imgs/energia1.png)");
    }

    if (energiaAtual==0) { // se energia for igual a 0 mostrar a img 0
        
        $("#energia").css("background-image", "url(imgs/energia0.png)");
        
        //Game Over
        gameOver();
    }

} // Fim da função energia()



//Função GAME OVER
function gameOver() {
	fimdejogo=true;
	musica.pause();
	somGameover.play();
	
	window.clearInterval(jogo.timer); // Para o jogo 
	jogo.timer=null;
	
	$("#jogador").remove();
	$("#inimigo1").remove();
	$("#inimigo2").remove();
	$("#amigo").remove();
	
	$("#fundoGame").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + 
    "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	} // Fim da função gameOver();


} // fim do jogo 