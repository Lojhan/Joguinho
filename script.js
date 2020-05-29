const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
let pontuacao = 0;
let objetivo = Math.floor(Math.random() * 20) + 10;
var vidas = 3;

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart);  
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); 
  elem.addEventListener("dragover", dragOver); 
  elem.addEventListener("dragleave", dragLeave); 
  elem.addEventListener("drop", drop); 

});

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

  lixeira = $( "[lixeira=true]");
  lixeira[0].setAttribute("game", pontosDoObj);
  lixeira[1].setAttribute("game", pontosDoObj);
  lixeira[2].setAttribute("game", pontosDoObj);
  lixeira[3].setAttribute("game", pontosDoObj);
  lixeira[4].setAttribute("game", pontosDoObj);
  lixeira[5].setAttribute("game", pontosDoObj);

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
      alert("Você venceu!");
      document.body.innerHTML = "";
      location.reload();
    }else{
      if(pontuacao > objetivo){
        alert("Ó não, tente novamente!");
        document.body.innerHTML = "";
        location.reload();
        }
      }
    }

    if(!isCorrectMatching){
      vidas--;
    }

    document.getElementById("vidas").innerHTML = ('Vidas: ' + vidas);  

    if(vidas == 0){
      alert("Ó não, tente novamente!");
        document.body.innerHTML = "";
        location.reload();
    }
  }

  document.getElementById("objetivo").innerHTML = ('Objetivo: ' + objetivo);