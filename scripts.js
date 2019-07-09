//  CONTENTS
//  1. INITIALIZATION
//    a. Ready..............Functions to call on DOMContentLoaded
//    b. Start..............Functions to start the game
//    c. Reset..............Reset current game
//
//  2. SQUARES
//    a. Matching...........Functions to determine matches
//    b. Styling............Functions to style the squares upon interaction
//
//  3. SCORING
//    a. Stars..............Functions to decrement stars
//    b. Timer..............Functions to time the current game
//    c. Win................Declare when game is won

///////////////////////////////////////
//  1a. Ready
///////////////////////////////////////

// Variables

const arrayCards = [
  "bell-slash",
  "bell-slash",
  "building",
  "building",
  "compass",
  "compass",
  "sun",
  "sun",
  "snowflake",
  "snowflake",
  "bell",
  "bell",
  "dot-circle",
  "dot-circle",
  "gem",
  "gem"
];
const queryDeck = document.getElementById("deck");
const queryMoves = document.getElementById("moves");
const queryMovesLabel = document.getElementById("moves-label");
const queryReset = document.getElementsByClassName("fa-repeat");
const queryTimer = document.getElementById("timer");
const queryTimerLabel = document.getElementById("timer-label");
  
let flippedCards = [],
  movesCount = 0,
  paused = false,
  started = false,
  timeCount = 0;

// Call functions to enable game functionality, establish global variables
function init() {

  
  // Cards need to exist before their classes can be selected
  console.log("Starting createCards()!");
  createCards();

  // Variables for selectors that can only be called after squares are created
  let queryCard = document.querySelectorAll(".card");

  // Enable functionality for square interaction
  // document.getElementsByClassName("card").addEventListener( "click" , flipCard);
  // let cardClass = document.getElementsByClassName("card");
  // Array.from(cardClass).forEach(function(element) {
  //   element.addEventListener( "click" , function (event) {
  //     console.log("CLICK");
  //   });
  // });
  console.log("adding card click event listener");
  document.body.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card')) {
      console.log("Card clicked! starting flipCard().");
      flipCard()
    }
  }, false);

  // Shuffle the icons, then create li items for each
  function createCards() {
    console.log("Running shuffle()!");
    let cards = shuffle(arrayCards);
    for (let card of cards) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      li.setAttribute("class", "card");
      // console.log("created li");

      i.setAttribute("class", "fas fa-" + card);
      // console.log("created <i> for " + card);

      li.appendChild(i);
      // console.log("appended i to li for " + card);

      queryDeck.appendChild(li);
      // console.log("appended li for " + card);
    }
    console.log("createCards() completed!");
  }

  // Function to shuffle deck items
  function shuffle(array) {
    var currentIndex = arrayCards.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    console.log("shuffle() Complete!");
    return array;
  }
console.log("init() complete!");
}

// Run after the page has finished loading
document.addEventListener("DOMContentLoaded", function() {
  // Add cards to the page
  console.log("DOM Content Loaded! Starting Init();");
  init();

  // Reset the game when button is clicked
  console.log("setting reset listener");
  const resetListener = document.querySelectorAll(".reset");
  resetListener[0].addEventListener( "click" , resetGameWarning);
  ///////////////////////////////////////
  //  1b. Start
  ///////////////////////////////////////
});

///////////////////////////////////////
//  1c. Reset
///////////////////////////////////////

// Reset game to initialization state
function resetGame() {
  const queryStars = document.querySelectorAll(".fa.fa-star");
  // while(queryDeck[0].firstChild) { 
  //   queryDeck[0].removeChild(queryDeck[0].firstChild);  
  //   movesCount = -1;
  //   if (queryDeck[0].firstChild == null) {
  //       break;
  //   }
  // }
  queryDeck.innerHTML = '';
  // console.log("all list items removed. Starting moveCounter().");
  // moveCounter();
  paused = false;
  console.log("paused = false");

  queryTimerLabel.textContent = "Seconds";
  console.log("queryTimerLabel changed to 'seconds'");

  // queryStars.classList.toggle(".fa");
  flippedCards = [];
  console.log("flippedCards emptied");
  // console.log("starting resetTimer()");
  // resetTimer();
  console.log("starting init()");
  init();
  console.log("resetGame() complete!");
}

// Modal dialog to confirm reset
function resetGameWarning() {
  paused = true;
  if (confirm("are you sure you wish to reset?") == true) {
    console.log("starting resetGame().");
    resetGame();
  } else {
    paused = false
  }
  console.log("ResetGameWarning() complete!");
}

///////////////////////////////////////
//  2a. Matching
///////////////////////////////////////

//  Check if the two open squares match
function checkMatch() {
  // If the array elements are the same
  if (flippedCards[0] === flippedCards[1]) {
    console.log("flippedCards match!");

    queryDeck
      .find("open")
      .classList.remove("open show")
      .classList.add("match flipped");
  } else {
    console.log("flippedCards don't match!");
    setTimeout(function() {
      queryDeck
        .find("open")
        .classList.add("wrong")
        .classList.remove("open show");
    });
  }

  // Increment move count
  movesCount++;
  console.log("movesCount incremented");


  // If all squares have been matched, win the game
  if (document.getElementsByClassName("match").length === arrayCards.length) {
    winGame();
  }

  // Clear temp array
  flippedCards = [];
  console.log("cleared flippedCards");
  console.log("checkMatch() Complete!");
}

///////////////////////////////////////
//  2b. Styling
///////////////////////////////////////

// When a square is clicked, do this stuff
function flipCard() {
  // Define currently clicked square
  let queryThis = document.querySelectorAll(this);

  // Traverse DOM element for this square's icon class
  let queryThisClass = queryThis[0].firstChild.classList[1];


  // Prevent flipping over more than two cards at once
  if (
    queryThis.classList.contains("open") ||
    queryThis.classList.contains("match") ||
    document.getElementsByClassName("open").length === 2
  ) {
    console.log("couldn't flip over more than two cards at once!");
    return;
  }

  // Start timer when first square is clicked
  if (started === false) {
    console.log("start timer when first square is clicked. starting startTimer().");
    startTimer();
  }

  // If the temporary array doesn't yet have two items in it
  if (arrayCards.length < 2) {
    queryThis.addClass("open show flipped");
    console.log("add classes to flipped card!");


  // Add class of clicked square to the temp array
    flippedCards.push(queryThisClass);
      console.log("added class of flipped card to temp array!");

  }

  // If two squares have been flipped, check to see if they match
  if (flippedCards.length === 2) {
    console.log("two squares have been flipped! starting checkMatch().");
    checkMatch();
  }
  console.log("flipCard() complete!");
}

///////////////////////////////////////
//  3a. Stars
///////////////////////////////////////

// Change solid star icon class to outlined version when a star is removed
function removeStar() {
  let queryStar = document.querySelectorAll(".fas .fa-star:last");
  queryStar[0].toggleClass("fas far");

  // Get current star count
  let starCount = document.querySelectorAll(".fas.fa-star").length;
  console.log("removeStar() complete!");

}

// Increment moves
function moveCounter() {
  // Increase move count by one
  movesCount++;
  console.log("movesCount incremented.");


  // Grammar check so score doesn't read "1 Moves"
  if (movesCount === 1) {
    queryMovesLabel.textContent = "Move";
  } else {
    queryMovesLabel.textContent = "Moves";
  }

  // Star removal when specific move counts are hit
  switch (movesCount) {
    case 9:
      console.log("running removeStar()!");
      removeStar();
      break;
    case 12:
      console.log("running removeStar()!");
      removeStar();
      break;
  }

  // Update page display of move count
  queryMoves.textContent = movesCount;
  console.log("moveCounter() complete!");
}

///////////////////////////////////////
//  3b. Timer
///////////////////////////////////////

// Start the timer

// Increment the counter every second

// Only increment if the game isn't "paused" (a modal window is open)

// Grammar check so timer doesn't read "1 Seconds"

// Game has been started

// Clear the timer when game is reset

///////////////////////////////////////
//  3c. Win
///////////////////////////////////////

// Modal dialog to announce that game has been won

// Pause the timer

// Get star count

// Announcement and option to reset
// message: 'You win with ' + (3 - document.querySelectorAll('.star').length) + ' or ' + starCount + ' stars',
