var firebaseRef = firebase.database().ref();
var lotsRef = firebaseRef.child("Lots");
var lotARef = lotsRef.child("SIU Lot A/");
var lotBRef = lotsRef.child("SIU Lot B/");
var spot;
refreshList();

function refreshList() {

    //reset the list every time
    document.getElementById("tbody").innerHTML = "";
    lotARef.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;

            //get data for each element in the db
            var childData = childSnapshot.val();
            var timeStamp = childSnapshot.val().PaidOn;
            var timerem = childSnapshot.val().TimeRem;

            var d1 = new Date(); // Get the time right now
            d1 = d1.toISOString().substr(11, 8);
            d1 = minutesToMillis(d1);
            var d2 = new Date(timeStamp); // Get the purchase time
            d2 = d2.toISOString().substr(11, 8);
            d2 = minutesToMillis(d2);
            var diff = (d1 - d2); // Minus those
            timerem = minutesToMillis(timerem); // Change amount paid for to milliseconds
           // window.alert(key  + " "+(timerem + diff)); //test alert

            if((timerem - diff) > 0){
              var entry = '<tr><td>' + key + '</td><td>' + timeStamp + '</td><td>' + 'Time Left: ' + secondsToTime(timerem - diff) + '</td></tr>';
            }
            else
            {
              var entry = '<tr><td>' + key + '</td><td>' + timeStamp + '</td><td>' + 'EXPIRED' + '</td></tr>';
            }
            document.getElementById('tbody').innerHTML += entry;
        });
    });

    document.getElementById("rbody").innerHTML = "";
    lotBRef.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;

            //get data for each element in the db
            var childData = childSnapshot.val();
            var timeStamp = childSnapshot.val().PaidOn;
            var timerem = childSnapshot.val().TimeRem;

            var d1 = new Date(); // Get the time right now
            d1 = d1.toISOString().substr(11, 8);
            d1 = minutesToMillis(d1);
            var d2 = new Date(timeStamp); // Get the purchase time
            d2 = d2.toISOString().substr(11, 8);
            d2 = minutesToMillis(d2);
            var diff = (d1 - d2); // Minus those
            timerem = minutesToMillis(timerem); // Change amount paid for to milliseconds

            if((timerem - diff) > 0){
              var entry = '<tr><td>' + key + '</td><td>' + timeStamp + '</td><td>' + 'Time Left: ' + secondsToTime(timerem - diff) + '</td></tr>';
            }
            else
            {
              var entry = '<tr><td>' + key + '</td><td>' + timeStamp + '</td><td>' + 'EXPIRED' + '</td></tr>';
            }
            document.getElementById('rbody').innerHTML += entry;
        });
    });
}

function minutesToMillis(minutes) {

    var a = minutes.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    return seconds;
}

function secondsToTime(seconds) {
  var date = new Date(1970,0,1);
  date.setSeconds(seconds);
  return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

function showAddSpot(lot){
  console.log("spots" + lot + "option");
  document.getElementById("spots" + lot + "option").innerHTML = '<br><div class="formheader"><p>Add Spot</p></div><div class="account-info"><p>Spot:</p><input id="newspot" type="text" class="account-form" name="fname"></div><br><button onClick="addSpot(\'' + lot + '\')" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Add</button><button onClick="cancelSpotOption()" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Cancel</button></div>';
}

function showDeleteSpot(lot){
  document.getElementById("spots" + lot + "option").innerHTML = '<br><div class="formheader"><p>Delete Spot</p></div><div class="account-info"><p>Spot:</p><input id="deletespot" type="text" class="account-form" name="fname"></div><br><button onClick="deleteSpot(\'' + lot + '\')" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Delete</button><button onClick="cancelSpotOption()" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Cancel</button></div>';
}

function addSpot(lot){
  var rootRef = firebase.database().ref();
  var spotsRef = rootRef.child('/Lots/SIU Lot ' + lot + '/' + document.getElementById("newspot").value);
  var now = new Date();
  spotsRef.set({
      "PaidOn": "1/1/2011 11:11:11 PM",
      "TimeRem": "0:00:00"
  });
  showSuccess("Spot: " + document.getElementById("newspot").value + " Added!")
}

function deleteSpot(lot){
  var rootRef = firebase.database().ref();
  var spotsRef = rootRef.child('/Lots/SIU Lot ' + lot + '/' + document.getElementById("deletespot").value);
  var now = new Date();
  spotsRef.remove();
  showSuccess("Spot: " + document.getElementById("deletespot").value + " Removed!")
}

function cancelSpotOption() {
  document.getElementById("spotsoption").innerHTML = '';
}

function refreshPage(){
  location.reload();
}

function showSuccess(message){
  document.getElementById("spotstable").innerHTML = message + '<br><button onClick="refreshPage()" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Continue</button>';
  document.getElementById("spotstableb").innerHTML = '';
}
