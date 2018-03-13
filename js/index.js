var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");
var firebaseRef = firebase.database().ref();

var lotsRef = firebaseRef.child("Lots");
var lotARef = lotsRef.child("SIU Lot A");



//test function to just populate html list no DB intraction
function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13 || event.which == 1) { // as the user presses the enter key, we will attempt to save the data
        var spotNumber = document.getElementById('spotNumber').value.trim();
        if (spotNumber.length == 3) {
            saveToFB(spotNumber);
        	var li = '<li>' + spotNumber + '</li>';
            document.getElementById('lotASpots').innerHTML += li;
            
        }
        document.getElementById('spotNumber').value = '';
        return false;
    }
}

//code to add spot to DB by lot reffrence 
function saveToFB(spotNumber){	
    var inLot = document.getElementById('lot').value.trim();
	lotsRef.child(inLot).child(spotNumber).set({
		Occupited: "True",
		TimeRem: "2:00:00",
        PaidOn: timeStamp()
	});
		
}


//create time stamp 
function timeStamp() {
// Create a date object with the current time
  var now = new Date();

// array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// find AM or PM depending on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
  time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

// Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}


