const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
let pontuacao = 0;
let objetivo = Math.floor(Math.random() * 20) + 10;
var vidas = 3;

var tutoHandler = document.getElementById("tutoHandler"); 

function tuto(){
  
  tutoHandler.innerHTML = '<img  style="position:absolute; " src="./images/tutorial.png"  id="tuto" width="1920" height="1080"></img>';

}

function untuto(){
  
  tutoHandler.innerHTML = '';

}


var body = document.getElementById("body"); 

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart);  
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); 
  elem.addEventListener("dragover", dragOver); 
  elem.addEventListener("dragleave", dragLeave); 
  elem.addEventListener("drop", drop); 

});

function playAcerto(){ 
acertar.play(); 
} 



function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); 
  pontosDoObj = event.currentTarget.attributes.game.nodeValue;
  valorUnico = event.currentTarget.attributes.unique.nodeValue;

  console.log(valorUnico);
}

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); 
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {

  event.preventDefault(); 
  event.target.classList.remove("droppable-hover");

droppableElements.forEach(elem => {
  elem.setAttribute("game", pontosDoObj);
});
  

  const draggableElementData = event.dataTransfer.getData("text");
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;

  if(isCorrectMatching) {

    
    const draggableElement = document.getElementById(draggableElementData);
    var inGame = event.target.getAttribute("game");

    issoAquiExisteSoPeloParse = parseInt(inGame, 10);

    novoAtributo = $( "[unique=" + valorUnico + "]");
    novoAtributo[0].setAttribute("draggable", "false");
    novoAtributo[0].classList.add("dragged");
    novoAtributo[0].classList.remove("draggable");

    

    pontuacao = (pontuacao + issoAquiExisteSoPeloParse);
    issoAquiExisteSoPeloParse = 0;

    document.getElementById("result").innerHTML = ('Total: ' + pontuacao);

    if (pontuacao == objetivo){
      document.body.innerHTML = "";
      ganhar();
    }else{
      if(pontuacao > objetivo){
        document.body.innerHTML = "";
        perder();
        }
      }
    }

    if(!isCorrectMatching){
      vidas--;
    }

    document.getElementById("vidas").innerHTML = ('Vidas: ' + vidas);  

    if(vidas == 0){
        document.body.innerHTML = "";
        perder();
    }
  }

  document.getElementById("objetivo").innerHTML = ('Objetivo: ' + objetivo);

  function ganhar(){
    
    body.classList.add("fundo");
    document.body.innerHTML = "<h3 onclick="+"recomecar();"+" class="+"win"+">Você venceu!</h3>"+"<audio id="+"ganhou"+"><source src="+"./sounds/08.mp3"+"type="+"audio/mpeg"+"></audio>";
    var ganhou = document.getElementById("ganhou"); 
    ganhou.play();

    


  }

  function perder(){
    
    body.classList.add("fundo");
    document.body.innerHTML = "<h3 onclick="+"recomecar();"+" class="+"win"+">Tente novamente!</h3>";

  }

  function recomecar(){
    location.reload();
  }

  
  


