$("#playerBox").on("click", function(){
  var whichCard = getRandomInt(1, 53);
  $("#playerBox").html(whichCard);
  console.log(whichCard);
})
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
