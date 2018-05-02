function getCurrentSpot(){
firebase.database().ref('/USERS_TABLE/' + guid + '/CURRENT_SPOT').once('value').then(function(snapshot) {

  var lot = snapshot.val().Lot;
  var spot = snapshot.val().Spot;
  var purchaseTime = snapshot.val().PurchaseTime;
  var amount = snapshot.val().Amount;

  var d1 = new Date(); // Get the time right now
  var d2 = new Date(purchaseTime); // Get the purchase time
  var diff = Math.abs(d1-d2); // Minus those

  amount = minutesToMillis(amount); // Change amount paid for to milliseconds
    //spot.remove();
    if((amount - diff) > 0){
      document.getElementById('addTimeSpot').style.display = 'block';
    }
  if((amount - diff) < 0){
      document.getElementById('addTimeSpot').style.display = 'none';
      document.getElementById('cardSpotTimeLot').innerHTML = lot + " " + spot + " " + "Time Expired!";
  }
  else {
    var timeLeft = Math.abs(amount - diff); // Get the difference

    formattedtimeLeft = millisToMinutesAndSeconds(timeLeft); // Turn to hours minutes and seconds

    document.getElementById('cardSpotTimeLot').innerHTML = lot + " " + spot + " " + formattedtimeLeft;
    startTimer(timeLeft, lot, spot);
  }
});
}

function minutesToMillis(minutes){
  var seconds = ((minutes * 60000));
  return seconds;
}

function millisToMinutesAndSeconds(millis) {
  var hours = Math.floor(millis / (1000 * 60 * 60) % 24);
  var minutes = Math.floor(millis / (1000 * 60) % 60);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function expire(){
  document.getElementById('cardSpotTimeLot').innerHTML = lot + " " + spot + " " + "Time Expired!";
}

function startTimer(duration, lot, spot) {
    setInterval(function () {
        duration -= 1000;
        newtime = millisToMinutesAndSeconds(duration);
        document.getElementById('cardSpotTimeLot').innerHTML = lot + " " + spot + " " + newtime;

        if(newtime < 0){
          expire();
        }
    }, 1000);
}
