const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
let pontuacao = 0;

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
  console.log(pontosDoObj);
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
  $("img").attr("game", pontosDoObj);

  const draggableElementData = event.dataTransfer.getData("text");
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;

  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);

    var inGame = event.target.getAttribute("game");

    issoAquiExisteSoPeloParse = parseInt(inGame, 10);

    pontuacao = (pontuacao + issoAquiExisteSoPeloParse);

    document.getElementById("result").innerHTML = ('Pontuação: ' + pontuacao);

    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
  
    // $("img").attr("game", "0");

    

  }
}

if (pontuacao == 1){

  function delete_row(e){ 
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode.parentNode.parentNode.parentNode);

}
}
