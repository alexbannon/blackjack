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
var canPlayerLeave = true;
// function addChips() {
//   if(event.target.className == "circle") {
//     if($(event.target).children(0).is(":checked") === false) {
//       var userBrings = prompt("How Much Do You Want To Bring To The Table?", "500");
//       while(userBrings % 10 !== 0) {
//         userBrings = prompt("Sorry. Only $10 chips are available at this table. Please bring a multiple of 10", "500");
//       }
//       if(userBrings === null) {
//       }
//       else {
//         var whichPlayer = parseInt($(event.target).children(0).attr("id"));
//         $("#bet"+whichPlayer).html('$50<div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
//         $(event.target).html("$"+userBrings);
//         $(event.target).append('<input class = "isPlayer" id="'+whichPlayer+'" type="checkbox" name="isPlaying" value="isPlaying" checked>')
//       }
//     }
//     else {
//       var userLeavingGame = prompt("Do You Want To Leave The Game?", "yes").toLowerCase();
//       if(userLeavingGame === "yes" || userLeavingGame === "y"){
//         var whichPlayer = parseInt($(event.target).children(0).attr("id"));
//         $(event.target).html("Sit");
//         $(event.target).append('<input class = "isPlayer" id="'+whichPlayer+'" type="checkbox" name="isPlaying" value="isPlaying">')
//         $("#bet"+whichPlayer).html('Vacant<div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
//       }
//     }
//   }
// }

$(".chips").on("click", function(){
  if(event.target.className == "circle") {
    if(canPlayerLeave === false) {
    }
    else {
      if($(event.target).children(0).is(":checked") === false) {
        var userBrings = prompt("How Much Do You Want To Bring To The Table?", "500");
        while(userBrings % 10 !== 0 || userBrings > 9990) {
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
          $("#bet"+whichPlayer).html('Bet: $50<input class = "isPlayer" id="'+whichBetId+'" type="checkbox" name="isPlaying" value="isPlaying"><div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
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
})
$(".betAmount").on("click", function(){
  if(event.target.className == "betNoMargin") {
    if(canPlayerLeave === false) {
    }
    else {
        var whatsInBetString = $(event.target).text();
        if(whatsInBetString.indexOf("Vacant") > -1) {
          alert("Click sit to join game!");
        }
        else {
          var whichPlayer = $(event.target).children().eq(0).attr("id").length;
          var storeId = $(event.target).children().eq(0).attr("id");
          console.log(whichPlayer);
          var changeBetAmount = prompt("How much would you like to bet per round? Only multiples of 10 please!", "50");
          while(changeBetAmount % 10 !== 0 || changeBetAmount > 1000) {
            var changeBetAmount = prompt("Sorry. Only bet amounts that are multiples of 10 are allowed and maximum bet is $1000", "50");
          }
          if(changeBetAmount === null) {
          }
          else {
            $(event.target).html('Bet: $'+changeBetAmount+'<input class = "isPlayer" id="'+storeId+'" type="checkbox" name="isPlaying" value="isPlaying"><div id="stand'+whichPlayer+'">Stand</div><div id="double'+whichPlayer+'">Double</div>');
          }

        }
    }
  }
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

function divideByEightAndRoundUp(input) {
  return Math.ceil(input / 8);
}
function dealerStarts() {
  dealerTotal = 0;
  for(var i = 0; i < 10; i++) {
    $("#dealerArea").children(".dealerCards").eq(i).empty();
  }
  var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
  getValueOfDealerCard();
  $("#dealerTotal").html("Dealer Total: ??");
  $("#dealerArea").children(".dealerCards").eq(0).append('<img src="playing_cards/'+whichCardToAdd+'" height="127px" width="87px"/>')
  totalCardsPlayed++;
  cardsRemainingInShoe--;
  var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
  getValueOfDealerCard();
  $("#dealerTotal").html("Dealer Total: ??");
  $("#dealerArea").children(".dealerCards").eq(1).append('<img id="hiddenDealerCard" src="playing_cards/'+whichCardToAdd+'" height="127px" width="87px"/>')
  $("#dealerCard2Blank").css("visibility", "visible");
  totalCardsPlayed++;
  cardsRemainingInShoe--;
}
function playersStart() {
  for(var i = 4; i >= 0; i--){
    playerTotal = 0;
    var isPlayerSitting = $(".chips").children().eq(i).text();
      if(isPlayerSitting.indexOf("Sit") > -1) {
        $(".playerArea").children().eq(i).children().empty();
        $(".totals").children().eq(i).empty()
        $(".playerArea").children().eq(i).children().empty();
      }
      else {
        $(".playerArea").children().eq(i).children().empty();
        var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
        addValueOfPlayerCard();
        $(".playerArea").children().eq(i).children().eq(0).append('<img src="playing_cards/'+whichCardToAdd+'" height="127px" width="87px"/>')
        var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
        totalCardsPlayed++;
        var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
        addValueOfPlayerCard();
        $(".playerArea").children().eq(i).children().eq(1).append('<img src="playing_cards/'+whichCardToAdd+'" height="127px" width="87px"/>')
        totalCardsPlayed++;
        cardsRemainingInShoe -= 2;
        $("#shoeCounter").html(cardsRemainingInShoe);
        if(playerTotal === 21) {
          $(".totals").children().eq(i).html("Blackjack!");
        }
        else{
          $(".totals").children().eq(i).html(playerTotal);
        }
      }
  }
}
function playersContinue() {
  for(var i = 4; i >= 0; i--){
    var isPlayerSitting = $(".chips").children().eq(i).text();
      if(isPlayerSitting.indexOf("Sit") > -1) {
      }
      else {
        //while user has not hit sit ...
        $(".playerArea").children().eq(i).on("click", function(){
          playerTotal = parseInt($(".totalDisplayed").eq(i).html())
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
          var whichCardSlot = 2;
          $(".playerArea").children().eq(i).children().eq(whichCardSlot).append('<img id="playerCard"src="playing_cards/'+whichNumber+'" />')
          totalCardsPlayed++;
          whichCardSlot++;
          if(playerTotal > 21) {
            if( haveAce === false) {
              $(".totalDisplayed").eq(i).html("BUST!");
              playerTotal = 0;
            }
            else {
              playerTotal -= 10;
              haveAce = false;
              $(".totalDisplayed").eq(i).html(playerTotal)
            }
          }
          else {
            $(".totalDisplayed").eq(i).html(playerTotal);
          }
        })
      }
    }
  }
shuffleCards(arrayOfPlayingCards);
arrayOfPlayingCards = arrayOfPlayingCards.map(divideByEightAndRoundUp);
var shoeOfSixDecks = arrayOfPlayingCards.slice(0,312);

function startGame() {
  playersStart();
  dealerStarts();
  canPlayerLeave = false;
  playersContinue();

}
// function dealersTurn() {
//   dealerTotal = 0;
//   whichDealerCardToShow = 0;
//   for(var i = 0; i < 10; i++) {
//     $("#dealerArea").children(".dealerCards").eq(i).empty();
//   }
//   while(dealerTotal < 17) {
//     getValueOfDealerCard();
//     var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
//     $("#dealerArea").children(".dealerCards").eq(whichDealerCardToShow).append('<img src="playing_cards/'+whichCardToAdd+'" height="127px" width="87px"/>')
//     totalCardsPlayed++;
//     if(whichDealerCardToShow < 8) {
//       whichDealerCardToShow++;
//     }
//     if(dealerTotal > 21) {
//       if( haveAce === false) {
//         $("#dealerTotal").html("Dealer Total: BUST!");
//       }
//       else {
//         dealerTotal -= 10;
//         haveAce = false;
//         $("#dealerTotal").html("Dealer Total: " + dealerTotal);
//       }
//     }
//     else {
//       $("#dealerTotal").html("Dealer Total: " + dealerTotal);
//     }
//     cardsRemainingInShoe--;
//   }
//   $("#shoeCounter").html(cardsRemainingInShoe);
// }
//$("#dealerArea").on("click", dealersTurn);
function getValueOfDealerCard() {
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
}
function addValueOfPlayerCard() {
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
}
