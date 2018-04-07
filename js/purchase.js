var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");
var firebaseRef = firebase.database().ref();
var lotsRef = firebaseRef.child("Lots");
var lotARef = lotsRef.child("SIU Lot A/");
var lotBRef = lotsRef.child("SIU Lot B/");
var spot;

refreshList();
// Get data from Firebase DB
// Generates a simple HTML list from key value of each lot that is occupied
function refreshList() {
    //reset the list every time
    document.getElementById("lotASpots").innerHTML = " ";
    lotARef.once("value").then(function (snapshot) {
		document.getElementById("lotASpots").innerHTML = " ";
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;

            //get data for each element in the db
            var childData = childSnapshot.val();
            var timeStamp = childSnapshot.val().PaidOn;
            var timerem = childSnapshot.val().TimeRem;
            var li = '<li>' + key + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + timeStamp + '</li>';
			document.getElementById('lotASpots').innerHTML += li;
        });
    });

	document.getElementById("lotBSpots").innerHTML = " ";
    lotBRef.once("value").then(function (snapshot) {
		document.getElementById("lotBSpots").innerHTML = " ";
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;

            //get data for each element in the db
            var childData = childSnapshot.val();
            var timeStamp = childSnapshot.val().PaidOn;
            var timerem = childSnapshot.val().TimeRem;
            var li = '<li>' + key + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + timeStamp + '</li>';
            document.getElementById('lotBSpots').innerHTML += li;
        });
    });
}

// function to populate html list every time new spot is taken
function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13 || event.which == 1) { // as the user presses the enter key, we will attempt to save the data
        var spotNumber = document.getElementById('spotNumber').value.trim();
        if (spotNumber.length == 3) {
            saveToFB(spotNumber);
        }
        document.getElementById('spotNumber').value = '';
        return false;
    }
}

// Add spot to DB by lot reffrence
function saveToFB(spotNumber) {
    var inLot = document.getElementById('lot').value.trim();

    var rootRef = firebase.database().ref();
    var parkingRef = rootRef.child('/USERS_TABLE/' + guid + '/CURRENT_SPOT');
    parkingRef.set({
      "Lot": inLot,
      "Spot": spotNumber,
      "Amount": "120",
      "PurchaseTime": timeStamp()
    });

    lotsRef.child(inLot).child(spotNumber).set({
        TimeRem: "2:00:00",
        PaidOn: timeStamp()
    });
    refreshList();
}

// Create time stamp
function timeStamp() {
    // Create a date object with the current time
    var now = new Date();

    // array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

    // array with the current hour, minute and second
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

    // find AM or PM depending on the hour
    var suffix = time[0] < 12 ? "AM" : "PM";

    // Convert hour from military time
    time[0] = time[0] < 12 ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
    time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}
