var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");
var firebaseRef = firebase.database().ref();

var lotsRef = firebaseRef.child("Lots");
var lotARef = lotsRef.child("SIU Lot A");



//test function to just populate html list no DB intraction
function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13) { // as the user presses the enter key, we will attempt to save the data
        var spotNumber = document.getElementById('spotNumber').value.trim();
        if (spotNumber.length > 0) {
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
		TimeRem: "02:00:00",
        PaidOn: "02/08/2018 12:00"
	});
		
}


