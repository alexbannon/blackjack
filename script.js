//shuffle Algorithm using Fisher Yates Shuffle
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
shuffleCards(arrayOfPlayingCards);
arrayOfPlayingCards = arrayOfPlayingCards.map(divideByEightAndRoundUp);
var shoeOfSixDecks = arrayOfPlayingCards.slice(0,312);
//initial variables
var totalCardsPlayed = 0;
var playerTotal = 0;
var playerOneTotal = 0;
var playerTwoTotal = 0;
var playerThreeTotal = 0;
var playerFourTotal = 0;
var playerFiveTotal = 0;
var dealerTotal = 0;
var whichDealerCardToShow = 0;
var whichUserCard = 2;
var cardsRemainingInShoe = 312;
var howManyAces = 0;
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

function dealerStarts() { //good
  dealerTotal = 0;
  howManyAces = 0;
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
  $("#shoeCounter").html(cardsRemainingInShoe);
}
function playersStart() { //good
  for(var i = 4; i >= 0; i--){
    playerTotal = 0;
    var isPlayerSitting = $(".chips").children().eq(i).text();
      if(isPlayerSitting.indexOf("Sit") > -1) {
        $(".playerArea").children().eq(i).children().empty();
        $(".totals").children().eq(i).empty()
        $(".playerArea").children().eq(i).children().empty();
      }
      else {
        if(i === 4) {
          playerFivePlaying = true;
        }
        if(i === 3) {
          playerFourPlaying = true;
        }
        if(i === 2) {
          playerThreePlaying = true;
        }
        if(i === 1) {
          playerTwoPlaying = true;
        }
        if(i === 0) {
          playerOnePlaying = true;
        }
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
function hitMe() {
  var whichNumber = shoeOfSixDecks[totalCardsPlayed] + ".png";
  if(whichUserCard < 4) {
  $(this).children().eq(whichUserCard).append('<img id="playerCard"src="playing_cards/'+whichNumber+'" />')
  }
  if(whichUserCard === 4) {
    $(this).children().eq(whichUserCard).empty();
    $(this).children().eq(whichUserCard).append('<img id="playerCard"src="playing_cards/'+whichNumber+'" />')
    whichUserCard--;
  }
  whichPlayer = $(this).index();
  playerTotal = parseInt($(".totals").children().eq(whichPlayer).html());
  addValueOfPlayerCard();
  $(".totals").children().eq(whichPlayer).html(playerTotal);
  totalCardsPlayed++;
  whichUserCard++;
  cardsRemainingInShoe--;
  $("#shoeCounter").html(cardsRemainingInShoe);
}
function stand() {
  whichUserCard = 2;
  var thisPlayer = $(this).parent().children().eq(0).attr("id").length;
  if(thisPlayer === 5) {
    playerFivePlaying = false;
    $(".playerArea").children().eq(4).off("click", hitMe);
  }
  if(thisPlayer === 4) {
    playerFourPlaying = false;
    $(".playerArea").children().eq(3).off("click", hitMe);
  }
  if(thisPlayer === 3) {
    playerThreePlaying = false;
    $(".playerArea").children().eq(2).off("click", hitMe);
  }
  if(thisPlayer === 2) {
    playerTwoPlaying = false;
    $(".playerArea").children().eq(1).off("click", hitMe);
  }
  if(thisPlayer === 1) {
    playerOnePlaying = false;
    $(".playerArea").children().eq(0).off("click", hitMe);
  }
  whoIsPlaying();
}
// $("#stand5").on("click", stand);
// $("#stand4").on("click", stand);
// $("#stand3").on("click", stand);
// $("#stand2").on("click", stand);
// $("#stand1").on("click", stand);

function whoIsPlaying() {
  if(playerFivePlaying === true) {
    $(".playerArea").children().eq(4).on("click", hitMe);
    $("#stand5").on("click", stand);
  }
  else {
    if(playerFourPlaying === true) {
      $(".playerArea").children().eq(3).on("click", hitMe);
      $("#stand4").on("click", stand);
    }
    else {
      if(playerThreePlaying === true) {
        $(".playerArea").children().eq(2).on("click", hitMe);
        $("#stand3").on("click", stand);
      }
      else {
        if(playerTwoPlaying === true) {
          $(".playerArea").children().eq(1).on("click", hitMe);
          $("#stand2").on("click", stand);
        }
        else {
          if(playerOnePlaying === true) {
            $(".playerArea").children().eq(0).on("click", hitMe);
            $("#stand1").on("click", stand);
          }
          else {
            dealerFinishes();
            if($("#totalOne").html() !== ""){
              playerOneTotal = parseInt($("#totalOne").html());
            }
            if($("#totalTwo").html() !== ""){
              playerTwoTotal = parseInt($("#totalTwo").html());
            }
            if($("#totalThree").html() !== ""){
              playerThreeTotal = parseInt($("#totalThree").html());
            }
            if($("#totalFour").html() !== "") {
              playerFourTotal = parseInt($("#totalFour").html());
            }
            if($("#totalFive").html() !== "") {
              playerFiveTotal = parseInt($("#totalFive").html());
            }
            console.log(dealerTotal);
          }
        }
      }
    }
  }
}

function startGame() {
  playersStart();
  dealerStarts();
  whoIsPlaying();
  //who won?
}
function dealerFinishes() {
  $("#hiddenDealerCard").css("visibility", "visible");
  $("#dealerCard2Blank").css("visibility", "hidden");
  $("#dealerTotal").html("Dealer Total: " + dealerTotal);
  whichDealerCardToShow = 4;
  while(dealerTotal < 17) {
    getValueOfDealerCard();
    var whichCardToAdd = shoeOfSixDecks[totalCardsPlayed] + ".png";
    $("#dealerArea").children().eq(whichDealerCardToShow).append('<img src="playing_cards/'+whichCardToAdd+'" height="127px" width="87px"/>')
    totalCardsPlayed++;
    if(whichDealerCardToShow < 11) {
      whichDealerCardToShow++;
    }
    if(dealerTotal > 21) {
      if( howManyAces === 0) {
        $("#dealerTotal").html("Dealer Total: BUST!");
      }
      else {
        dealerTotal -= 10;
        howManyAces--;
        $("#dealerTotal").html("Dealer Total: " + dealerTotal);
      }
    }
    else {
      $("#dealerTotal").html("Dealer Total: " + dealerTotal);
    }
    cardsRemainingInShoe--;

  }
  $("#shoeCounter").html(cardsRemainingInShoe);
  if(dealerTotal > 21) {
    $("#dealerTotal").html("Dealer Total: BUST!");
  }
}

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
      howManyAces++;
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
      howManyAces++;
    }
  }
  else{
    var playerPoints = Math.ceil(shoeOfSixDecks[totalCardsPlayed] / 4);
    playerTotal += playerPoints;
  }
}
