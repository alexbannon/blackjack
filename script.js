var clickCounter = 0;
var playerTotal = 0;
$("#playerThree").on("click", function(){
  $("#playerThree").empty();
  if(shoeOfSixDecks[clickCounter] > 36) {
    playerTotal += 10;
  }
  else{
    var playerPoints = Math.ceil(shoeOfSixDecks[clickCounter] / 4);
    playerTotal += playerPoints;
  }
  var whichNumber = shoeOfSixDecks[clickCounter] + ".png";
  console.log(whichNumber);
  $("#playerThree").append('<img id="playerOneCard"src="playing_cards/'+whichNumber+'" />')
  clickCounter++;
  if(playerTotal > 21) {
    alert("Bust!");
    playerTotal = 0;
  }
  console.log(playerTotal);
})
function shuffleCards(array) { //fisher Yates Shuffle
  for(var i = array.length - 1; i > 0; i--) {
    var pickRandomIndex = Math.floor(Math.random() * (i + 1));
    var holdValueToSwitchWithRandomIndexLater = array[i];
    array[i] = array[pickRandomIndex]; //switch out array[i] with new value, randomly chosen
    array[pickRandomIndex] = holdValueToSwitchWithRandomIndexLater; // Put switched out value back into array at this iterations random index choice
  }
  return array;
}
var arrayOfPlayingCards = [];
for(var i = 1; i < 417; i++) {
  arrayOfPlayingCards.push(i);
}
shuffleCards(arrayOfPlayingCards);
arrayOfPlayingCards = arrayOfPlayingCards.map(divideByEightAndRoundUp);
var shoeOfSixDecks = arrayOfPlayingCards.slice(0,312);
console.log(shoeOfSixDecks);
function divideByEightAndRoundUp(input) {
  return Math.ceil(input / 8);
}
