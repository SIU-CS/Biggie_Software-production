var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");
var firebaseRef = firebase.database().ref();


//code to add parking  spots manually 
function addSpot(event) {
    if (event.which == 13 || event.keyCode == 13) { 
        // as the user presses the enter key, we will attempt to save the data
        var soptNum = document.getElementById('soptNum').value.trim();
        if (soptNum.length > 0) {
        	var li = '<li>' + addSpot + '</li>';
            document.getElementById('parkingSpots').innerHTML += li;
        }
        document.getElementById('soptNum').value = '';
        return false;
    }
}

function submitClick(){
	
	firebaseRef.child("SIU Lot A").child("Spot 102").set({
		Spot1: "Open",
		Spot2: "Occupied",
		Spot3: "Open",
		Spot4: "Open"
	});
	
	
	
}

function newClick() {
	var messageText = mainText.value;
	
	firebaseRef.getRef().child("Users").child("Username").remove();
	firebaseRef.child("Users").child("New").set(messageText);
}