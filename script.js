var totalCardsPlayed = 0;
var playerTotal = 0;
var dealerTotal = 0;
var whichDealerCardToShow = 0;
var cardsRemainingInShoe = 312;
var haveAce = false;
var playerOnePlaying = false;
var playerTwoPlaying = false;
var playerThreePlaying = false;
var playerFourPlaying = false;
var playerFivePlaying = false;
function addChips() {
  if(event.target.className == "circle") {
    if($(event.target).children(0).is(":checked") === false) {
      var userBrings = prompt("How Much Do You Want To Bring To The Table?", "500");
      while(userBrings % 10 !== 0) {
        userBrings = prompt("Sorry. Only $10 chips are available at this table. Please bring a multiple of 10", "500");
      }
      if(userBrings === null) {
      }
      else {
        var whichPlayer = parseInt($(event.target).children(0).attr("id"));
        $("#bet"+whichPlayer).html('$50<div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
        $(event.target).html("$"+userBrings);
        $(event.target).append('<input class = "isPlayer" id="'+whichPlayer+'" type="checkbox" name="isPlaying" value="isPlaying" checked>')
      }
    }
    else {
      var userLeavingGame = prompt("Do You Want To Leave The Game?", "yes").toLowerCase();
      if(userLeavingGame === "yes" || userLeavingGame === "y"){
        var whichPlayer = parseInt($(event.target).children(0).attr("id"));
        $(event.target).html("Sit");
        $(event.target).append('<input class = "isPlayer" id="'+whichPlayer+'" type="checkbox" name="isPlaying" value="isPlaying">')
        $("#bet"+whichPlayer).html('Vacant<div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
      }
    }
  }
}

$(".chips").on("click", function(){
  if(event.target.className == "circle") {
    if($(event.target).children(0).is(":checked") === false) {
      var userBrings = prompt("How Much Do You Want To Bring To The Table?", "500");
      while(userBrings % 10 !== 0) {
        userBrings = prompt("Sorry. Only $10 chips are available at this table. Please bring a multiple of 10", "500");
      }
      if(userBrings === null) {
      }
      else {
        var whichPlayer = parseInt($(event.target).children(0).attr("id"));
        var whichBetId = "";
        for(var i = 0; i < whichPlayer; i++){
          whichBetId += "I";
        }
        $("#bet"+whichPlayer).html('$50<input class = "isPlayer" id="'+whichBetId+'" type="checkbox" name="isPlaying" value="isPlaying"><div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
        $(event.target).html("$"+userBrings);
        $(event.target).append('<input class = "isPlayer" id="'+whichPlayer+'" type="checkbox" name="isPlaying" value="isPlaying" checked>')
      }
    }
    else {
      var userLeavingGame = prompt("Do You Want To Leave The Game?", "yes").toLowerCase();
      if(userLeavingGame === "yes" || userLeavingGame === "y"){
        var whichPlayer = parseInt($(event.target).children(0).attr("id"));
        $(event.target).html("Sit");
        $(event.target).append('<input class = "isPlayer" id="'+whichPlayer+'" type="checkbox" name="isPlaying" value="isPlaying">')
        $("#bet"+whichPlayer).html('Vacant<div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
      }
    }
  }
})
$(".betAmount").on("click", function(){
  if(event.target.className == "betNoMargin") {
    var whatsInBetString = $(event.target).text();
    if(whatsInBetString.indexOf("Vacant") > -1) {
      alert("Click sit to join game!");
    }
    else {
      var whichPlayer = $(event.target).children().eq(0).attr("id").length;
      var storeId = $(event.target).children().eq(0).attr("id");
      console.log(whichPlayer);
      var changeBetAmount = prompt("How much would you like to bet per round? Only multiples of 10 please!", "50");
      while(changeBetAmount % 10 !== 0) {
        var changeBetAmount = prompt("Sorry. Only bet amounts that are multiples of 10 are allowed", "50");
      }
      if(changeBetAmount === null) {
      }
      else {
        $(event.target).html('$'+changeBetAmount+'<input class = "isPlayer" id="'+storeId+'" type="checkbox" name="isPlaying" value="isPlaying"><div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
      }

    }
  }
})
/*$("#playerThree").on("click", function(){
  if($(".isPLaying").is(":checked") === false) {
    alert("This player is not sitting at the table. Click sit to join");
  }
  else{
    $("#playerThree").empty();
    cardsRemainingInShoe--;
    $("#shoeCounter").html(cardsRemainingInShoe);
    if(shoeOfSixDecks[totalCardsPlayed] > 36) {
      playerTotal += 10;
    }
    else if(shoeOfSixDecks[totalCardsPlayed] < 5) {
      if(playerTotal > 10) {
        playerTotal += 1;
      }
      else {
        playerTotal += 11;
        haveAce = true;
      }
    }
    else{
      var playerPoints = Math.ceil(shoeOfSixDecks[totalCardsPlayed] / 4);
      playerTotal += playerPoints;
    }
    var whichNumber = shoeOfSixDecks[totalCardsPlayed] + ".png";
    //console.log(whichNumber);
    $("#playerThree").append('<img id="playerCard"src="playing_cards/'+whichNumber+'" />')
    totalCardsPlayed++;
    if(playerTotal > 21) {
      if( haveAce === false) {
        $("#totalThree").html("BUST!");
        playerTotal = 0;
      }
      else {
        playerTotal -= 10;
        haveAce = false;
        $("#totalThree").html(playerTotal)
      }
    }
    else {
      $("#totalThree").html(playerTotal);
    }
  }
})
*/
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
function divideByEightAndRoundUp(input) {
  return Math.ceil(input / 8);
}
function dealersTurn() {
  dealerTotal = 0;
  whichDealerCardToShow = 0;
  for(var i = 0; i < 10; i++) {
    $("#dealerArea").children(".dealerCards").eq(i).empty();
  }
  while(dealerTotal < 17) {
    if(shoeOfSixDecks[totalCardsPlayed] > 36) {
      dealerTotal += 10;
    }
    else if(shoeOfSixDecks[totalCardsPlayed] < 5) {
      if(dealerTotal > 10) {
        dealerTotal += 1;
      }
      else {
        dealerTotal += 11;
        haveAce = true;
      }
    }
    else{
      var dealerPoints = Math.ceil(shoeOfSixDecks[totalCardsPlayed] / 4);
      dealerTotal += dealerPoints;
    }
    var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
    $("#dealerArea").children(".dealerCards").eq(whichDealerCardToShow).append('<img src="playing_cards/'+whichCardToAdd+'" height="127px" width="87px"/>')
    totalCardsPlayed++;
    if(whichDealerCardToShow < 8) {
      whichDealerCardToShow++;
    }
    if(dealerTotal > 21) {
      if( haveAce === false) {
        $("#dealerTotal").html("Dealer Total: BUST!");
      }
      else {
        dealerTotal -= 10;
        haveAce = false;
        $("#dealerTotal").html("Dealer Total: " + dealerTotal);
      }
    }
    else {
      $("#dealerTotal").html("Dealer Total: " + dealerTotal);
    }
    cardsRemainingInShoe--;
  }
  $("#shoeCounter").html(cardsRemainingInShoe);
}
$("#dealerArea").on("click", dealersTurn);
