const gridElement = document.getElementById("grid");
const difficultyElement = document.getElementById("difficulty");
const playButtonElement = document.getElementById("play");
const messageElement = document.getElementById("message");

// creo la variabile che memorizza il punteggio
let totalPoints = 0;

let gameOver = false;

let totalCellNumber;

// Inizio gioco al click
playButtonElement.addEventListener("click", function() {

    // svuoto la griglia per una nuova partita
    gridElement.innerHTML = "";
    
    // - capire quante celle realizzare in base alla scelta della select
    totalCellNumber = getCellNumber(difficultyElement.value);
    console.log(totalCellNumber);
    
    
    // - genero le bombe
    const bombs = generateBombs(16, totalCellNumber);
    console.log(bombs);
    
    generateGrid(gridElement, totalCellNumber, bombs);
    
    gameOver = false;
    totalPoints = 0;
    messageElement.innerHTML = "";

});


// ----------------- Funzioni ------------------

function getCellNumber(difficulty) {

  if(difficulty == "easy") {
    return 100;
  } else if (difficulty == "normal") { 
    return 81;
  } else {
    return 49; 
  }
}


function generateGrid(gridContainerElement, totalCell, bombs) {
 
  for(let i = 1; i <= totalCell; i++) {
    
    // creo un elemento nuovo
    let newElement = document.createElement('div');
    
    // aggiungo la classe square
    newElement.className = "square";

    // stilizzo gli elementi e ne cambio la dimensione in base
    //  a quanti elementi debba creare
    newElement.style.width = `calc(100% / ${Math.sqrt(totalCell)})`;
    newElement.style.height = `calc(100% / ${Math.sqrt(totalCell)})`;


    // inserisco il numero della cella dentro la cella
    newElement.innerText = i;

    // rendo l'elemento nuovo il figlio del contenitore
    gridContainerElement.append(newElement);

    
    // aggiungo il listener del click
    newElement.addEventListener('click', function() {

      cellClick(newElement, bombs);

    });
  }
}


function cellClick(cellElement, bombs) {


  if(!gameOver) {
    if(bombs.includes(Number(cellElement.innerText))) {
      
      // SE la cella contiene una bomba, la cella diventa rossa
      cellElement.classList.add('bomb');
  
      // - blocca il gioco e comunica il punteggio
      gameOver = true;
  
      // comunico il game over all'utente
      messageElement.innerText = `Hai perso. Il tuo punteggio è di ${totalPoints}`;

      showBombs(bombs);
  
    } else {
      // :ALTRIMENTI
      
      // se la classe "empty" non è stata inserita nell'elemento
      if(!cellElement.classList.contains('empty')) {
        // - dai la classe "empty"
        cellElement.classList.add("empty");
              
        // - aumenta il punteggio di 1
        // total Points è una variabile GLOBALE
        totalPoints++;

        console.log('Punteggio: ' + totalPoints);
      }
      
      // controlliamo se l'utente ha fatto il punteggio massimo
      if(totalPoints == totalCellNumber - bombs.length) {
        messageElement.innerText = "Sei un dio greco potentissimo, hai vinto. Il tuo punteggio è "+ totalPoints;
        // - blocca il gioco e comunica il punteggio
        gameOver = true;

        // mostra le bombe
        showBombs(bombs);
      }

    }
  } 

}


function showBombs(bombs) {
  let squares = document.querySelectorAll('.square');

  console.log(squares)

  for (let i = 0; i < totalCellNumber; i++) {

    if(bombs.includes(Number(squares[i].innerText))) {

      squares[i].classList.add('bomb');

    }

  }
}


function generateBombs(quantity, maxNumber) {

  const bombs = [];

  while(bombs.length < quantity) {

    let randomNumber = randomNumberBetween(1, maxNumber)

    if(!bombs.includes(randomNumber)) {
      bombs.push(randomNumber);
    } 
    
  }

  return bombs;

}


function randomNumberBetween(min, max) {

  // genero un numero random
  let random = Math.floor(Math.random() * (max - min + 1) + min)

  // restituisce il valore
  return random;

}


